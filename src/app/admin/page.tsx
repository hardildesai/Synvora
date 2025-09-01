import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRegistrations } from '@/lib/mock-db';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export default async function AdminPage() {
  const registrations = await getRegistrations();

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
    <div className="container py-12">
      <h1 className="text-3xl font-headline font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
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
                    <Badge key={type} variant="secondary" className="text-base">{type.replace(/-/g, ' ')}: {count}</Badge>
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Food Preferences</CardTitle>
                 <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                 {Object.entries(foodTypeCounts).map(([type, count]) => (
                    <Badge key={type} variant="outline" className="text-base">{type}: {count}</Badge>
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
                        <TableCell>{format(reg.submittedAt, 'PPp')}</TableCell>
                        <TableCell>{reg.name}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell><Badge variant="default">{reg.passType.replace(/-/g, ' ')}</Badge></TableCell>
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
    </div>
  );
}