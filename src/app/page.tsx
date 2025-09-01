import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Music, Star, User, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-40 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/40 to-black opacity-50 z-0"></div>
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="container relative z-20 px-4 md:px-6">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-headline text-white drop-shadow-[0_2px_10px_rgba(var(--primary-rgb),0.8)]">
                    Synvora Night
                </h1>
                <p className="mt-4 max-w-[700px] mx-auto text-lg md:text-xl text-neutral-300">
                    Where the music, lights, and energy become one. An unforgettable experience awaits.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-lg font-semibold text-neutral-200">
                    <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-accent"/> 20th September</div>
                    <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-accent"/> 6:30 PM Onwards</div>
                    <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-accent"/> Venue TBD</div>
                </div>
                <div className="mt-8">
                    <Button asChild size="lg" className="font-bold text-lg px-8 py-6 transition-transform transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_theme(colors.primary)] hover:shadow-[0_0_30px_theme(colors.primary)]">
                        <Link href="/tickets">Buy Pass</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Highlights Section */}
        <section id="highlights" className="py-20 bg-secondary/20">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-accent">Event Highlights</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Card className="text-left bg-card/80 backdrop-blur-sm transition-all hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Music className="w-8 h-8 text-primary" />
                        <span className="font-headline">Stellar DJ Lineup</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Featuring top artists like DJ Aurora, Nova, and ByteFlow who will keep you dancing all night long.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-left bg-card/80 backdrop-blur-sm transition-all hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Star className="w-8 h-8 text-primary" />
                        <span className="font-headline">Exclusive Experience</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        A unique thematic concept with immersive visuals and an electrifying atmosphere you won't find anywhere else.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-left bg-card/80 backdrop-blur-sm transition-all hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <User className="w-8 h-8 text-primary" />
                        <span className="font-headline">VIP Perks</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Upgrade your night with express entry, access to the exclusive VIP lounge, and complimentary drinks.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  <Image src="https://picsum.photos/600/400" width={600} height={400} alt="Event Teaser 1" className="rounded-lg" data-ai-hint="music festival" />
                  <Image src="https://picsum.photos/600/400" width={600} height={400} alt="Event Teaser 2" className="rounded-lg" data-ai-hint="concert crowd" />
                </div>
            </div>
        </section>

        {/* FAQs Section */}
        <section id="faq" className="py-20 bg-secondary/20">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-headline text-accent">
              <HelpCircle className="inline-block w-8 h-8 mr-2" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What if I don't get the confirmation email?</AccordionTrigger>
                <AccordionContent>
                  Please check your spam or promotions folder first. If you still can't find it after 24 hours, contact our support at support@synvora.com with your payment details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I transfer my ticket to someone else?</AccordionTrigger>
                <AccordionContent>
                  Tickets are non-transferable. The name on the ticket must match the attendee's ID at the venue.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is the refund policy?</AccordionTrigger>
                <AccordionContent>
                  All ticket sales are final and non-refundable. In the unlikely case of event cancellation, you will be notified about the refund process via email.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </main>
    </div>
  );
}
