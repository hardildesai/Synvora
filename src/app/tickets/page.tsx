import TicketPurchaseFlow from '@/components/tickets/TicketPurchaseFlow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Upload, MailCheck, Ticket, Star } from 'lucide-react';

export default function TicketsPage() {
  return (
    <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-accent">Get Your Pass</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Follow the steps below to secure your entry. The entire process is designed to be simple and secure.
            </p>
        </div>
      <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        {/* Steps and Pass Details */}
        <div>
          <Card className="mb-8 bg-secondary/20 border-primary/30">
            <CardHeader>
              <CardTitle className="font-headline">Pass Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-md bg-muted">
                  <div>
                      <h3 className="font-bold text-lg flex items-center gap-2"><Ticket className="w-5 h-5 text-accent"/> General Pass</h3>
                      <p className="text-sm text-muted-foreground">Access to the main event area.</p>
                  </div>
                  <div className="text-xl font-bold text-primary">₹999</div>
              </div>
              <div className="flex justify-between items-center p-4 rounded-md bg-muted">
                  <div>
                      <h3 className="font-bold text-lg flex items-center gap-2"><Star className="w-5 h-5 text-accent"/> VIP Pass</h3>
                      <p className="text-sm text-muted-foreground">Express entry, VIP lounge & more.</p>
                  </div>
                  <div className="text-xl font-bold text-primary">₹2499</div>
              </div>
            </CardContent>
          </Card>

          <h3 className="font-headline text-xl font-bold mb-4">Purchase Steps:</h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="pt-1"><QrCode className="w-6 h-6 text-accent"/></div>
              <div><span className="font-semibold text-white">1. Fill Details:</span> Enter your name, email, and phone to proceed.</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="pt-1"><Upload className="w-6 h-6 text-accent"/></div>
              <div><span className="font-semibold text-white">2. Scan, Pay & Upload:</span> Use the QR code to pay. Upload a clear screenshot of your payment showing the transaction ID.</div>
            </li>
              <li className="flex items-start gap-3">
              <div className="pt-1"><MailCheck className="w-6 h-6 text-accent"/></div>
              <div><span className="font-semibold text-white">3. Get Your Code:</span> After verification, you will receive a unique entry code (OTP) in your email. This is your ticket!</div>
            </li>
          </ul>
        </div>

        {/* Purchase Form Flow */}
        <div className="bg-secondary/20 p-px rounded-lg shadow-2xl shadow-primary/20">
          <TicketPurchaseFlow />
        </div>
      </div>
    </div>
  );
}
