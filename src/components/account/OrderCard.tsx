import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface Order {
  id: string;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'Used';
  passType: string;
  price: number;
  date: string;
  venue: string;
}

interface OrderCardProps {
  order: Order;
}

const statusStyles = {
  Pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Confirmed: 'bg-green-500/20 text-green-300 border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
  Used: 'bg-muted text-muted-foreground border-border',
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl">
      <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-2">
            <Badge variant="outline" className={cn('font-mono', statusStyles[order.status])}>
              {order.status}
            </Badge>
            <p className="text-sm font-mono text-muted-foreground">{order.id}</p>
          </div>
          <h3 className="font-bold text-lg">{order.passType}</h3>
          <p className="text-sm text-muted-foreground">
            {format(new Date(order.date), 'EEE, MMM d, yyyy')} • {order.venue}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
          <p className="text-lg font-bold">₹{order.price}</p>
          <div className="flex gap-2 w-full sm:w-auto">
            {order.status === 'Pending' && (
              <Button size="sm" variant="outline" className="w-full sm:w-auto">Upload Payment</Button>
            )}
            <Button size="sm" className="w-full sm:w-auto bg-primary/80 hover:bg-primary">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}