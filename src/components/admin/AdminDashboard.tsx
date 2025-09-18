'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Download } from 'lucide-react';
import { useState } from 'react';
import type { Registration } from '@/lib/db';
import { Button } from '../ui/button';
import Papa from 'papaparse';

interface AdminDashboardProps {
  initialRegistrations: Registration[];
}

export default function AdminDashboard({
  initialRegistrations,
}: AdminDashboardProps) {
  const [registrations, setRegistrations] = useState(initialRegistrations);

  // This would be used if we needed to poll for new registrations
  // For now, the initial data from the server is sufficient.
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const freshRegistrations = await getRegistrations();
  //     setRegistrations(freshRegistrations);
  //   }, 5000); // Poll every 5 seconds

  //   return () => clearInterval(interval);
  // }, []);

  const handleExport = () => {
    // We don't want to export the screenshot data URI
    const dataToExport = registrations.map(
      ({ paymentScreenshotDataUri, submittedAt, ...rest }) => ({
        ...rest,
        submittedAt: submittedAt ? format(new Date(submittedAt.seconds * 1000), 'yyyy-MM-dd HH:mm:ss') : '',
      })
    );

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `synvora_registrations_${new Date().toISOString()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const passTypeCounts = registrations.reduce((acc, reg) => {
    acc[reg.passType] = (acc[reg.passType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const foodTypeCounts = registrations.reduce((acc, reg) => {
    if (reg.foodType !== 'none' && reg.foodType !== 'not-applicable') {
      acc[reg.foodType] = (acc[reg.foodType] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <Button onClick={handleExport} disabled={registrations.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registrations
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Types</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {Object.entries(passTypeCounts).map(([type, count]) => (
              <Badge key={type} variant="secondary" className="text-base">
                {type.replace(/-/g, ' ')}: {count}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Food Preferences
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {Object.entries(foodTypeCounts).map(([type, count]) => (
              <Badge key={type} variant="outline" className="text-base">
                {type}: {count}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registration List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pass Type</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Event Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell>{reg.submittedAt ? format(new Date(reg.submittedAt.seconds * 1000), 'PPp') : 'N/A'}</TableCell>
                  <TableCell>{reg.name}</TableCell>
                  <TableCell>{reg.email}</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      {reg.passType.replace(/-/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{reg.transactionId}</TableCell>
                  <TableCell className="font-mono">{reg.eventCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {registrations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No registrations yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
