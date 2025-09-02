import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, LifeBuoy, MoreVertical, Star, Ticket, User, Bell } from 'lucide-react';
import Link from 'next/link';
import OrderCard from '@/components/account/OrderCard';
import type { Order } from '@/components/account/OrderCard';

// Mock data - in a real app, this would be fetched from a database
const mockOrders: Order[] = [
  {
    id: 'SYN-00102',
    status: 'Confirmed',
    passType: 'General Pass + Food',
    price: 700,
    date: '2024-09-20T18:30:00Z',
    venue: 'Venue TBD',
  },
  {
    id: 'SYN-00097',
    status: 'Pending',
    passType: 'Couples Entry + Food',
    price: 1200,
    date: '2024-09-20T18:30:00Z',
    venue: 'Venue TBD',
  },
  {
    id: 'SYN-00081',
    status: 'Used',
    passType: 'General Pass',
    price: 550,
    date: '2023-10-15T18:30:00Z', // Previous event example
    venue: 'City Arena',
  }
];


export default function AccountPage() {
  const confirmedTickets = mockOrders.filter(o => o.status === 'Confirmed').length;
  const pendingTickets = mockOrders.filter(o => o.status === 'Pending').length;

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-center">My Account</h1>
          <p className="text-center text-muted-foreground">Manage your tickets, profile, and more.</p>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Ticket className="w-4 h-4" /> My Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{mockOrders.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Star className="w-4 h-4" /> Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
               <p className="text-sm font-bold">
                <span className="text-green-400">{confirmedTickets} Confirmed</span>
                <span className="text-muted-foreground"> • </span>
                <span className="text-yellow-400">{pendingTickets} Pending</span>
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Area */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">My Orders</h2>
            {mockOrders.length > 0 ? (
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
               <Card className="text-center p-8 border-dashed">
                <CardTitle className="font-headline">You haven’t booked yet</CardTitle>
                <CardDescription className="mt-2 mb-4">Grab a pass and be part of the story.</CardDescription>
                <Button asChild>
                  <Link href="/tickets">Buy a Pass</Link>
                </Button>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
            <Button variant="outline" asChild>
                <Link href="/tickets">Buy More Passes</Link>
            </Button>
        </div>

      </div>
    </div>
  );
}