import TicketPurchaseFlow from '@/components/tickets/TicketPurchaseFlow';

export default function TicketsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-secondary/20 p-px rounded-lg shadow-2xl shadow-primary/20">
          <TicketPurchaseFlow />
        </div>
      </div>
    </div>
  );
}
