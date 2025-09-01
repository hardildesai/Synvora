import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Ticket, PartyPopper } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-24 bg-gradient-to-b from-background to-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline text-primary-foreground bg-primary/80 dark:bg-primary/50 px-4 py-2 rounded-lg inline-block">
            Synvora
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-foreground/80">
            Your exclusive gateway to the most electrifying music festivals.
            Seamlessly buy passes, verify payments, and get your unique entry
            code instantly.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="font-bold text-lg px-8 py-6 transition-transform transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/login">Buy Tickets Now</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-20 max-w-5xl mx-auto">
          <Card className="text-left bg-card/80 backdrop-blur-sm transition-all hover:shadow-2xl hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Ticket className="w-8 h-8 text-primary" />
                <span className="font-headline">Easy Ticketing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ditch the forms. A simple, secure account is all you need to
                purchase your festival pass.
              </p>
            </CardContent>
          </Card>

          <Card className="text-left bg-card/80 backdrop-blur-sm transition-all hover:shadow-2xl hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Music className="w-8 h-8 text-primary" />
                <span className="font-headline">Instant Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pay with our QR code, upload your proof, and let our AI verify
                your payment in moments.
              </p>
            </CardContent>
          </Card>

          <Card className="text-left bg-card/80 backdrop-blur-sm transition-all hover:shadow-2xl hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <PartyPopper className="w-8 h-8 text-primary" />
                <span className="font-headline">Get Your Code</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once verified, receive your unique event entry code directly. No
                waiting, no hassle.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
