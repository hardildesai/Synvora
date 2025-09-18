import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CountdownTimer from '@/components/CountdownTimer';
import placeholderImages from '@/lib/placeholder-images.json';
import FluidGradient from '@/components/FluidGradient';

export default function Home() {

  const eventDate = '2024-09-20T18:30:00';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="relative z-0">

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
            <FluidGradient />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10"></div>
            
            <div className="relative z-20 container px-4 md:px-6 flex flex-col items-center">
                <h1 className="text-5xl md:text-8xl font-extrabold font-headline text-white drop-shadow-[0_4px_15px_hsl(var(--primary)/0.6)]">
                    SYNVORA
                </h1>
                <p className="mt-4 max-w-[700px] mx-auto text-lg md:text-xl text-neutral-200 font-medium">
                    Where Sound Becomes Legend
                </p>
                <div id="heroCountdown" className="my-8">
                    <CountdownTimer targetDate={eventDate} />
                </div>
                <div className="mt-4">
                    <Button id="heroBookBtn" asChild size="lg" className="font-bold text-lg px-10 py-7 transition-transform transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary))] hover:shadow-[0_0_30px_hsl(var(--primary))]">
                      <Link href="/tickets">Book Tickets</Link>
                    </Button>
                </div>
            </div>
        </section>
        
        {/* Gallery Section */}
        <section id="gallery" className="py-20 md:py-32 scroll-mt-20">
            <div className="container px-4 md:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
                    Past <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Realities</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-8">
                  <div className="group relative overflow-hidden rounded-lg">
                    <Image src={placeholderImages.gallery1.src} width={600} height={400} alt="Vibrant laser show at a music festival" className="rounded-lg aspect-video object-cover transition-transform duration-500 group-hover:scale-110" data-ai-hint="music festival laser show" />
                  </div>
                   <div className="group relative overflow-hidden rounded-lg">
                    <Image src={placeholderImages.gallery2.src} width={600} height={400} alt="Crowd with hands in the air at a concert" className="rounded-lg aspect-video object-cover transition-transform duration-500 group-hover:scale-110" data-ai-hint="concert crowd hands" />
                  </div>
                   <div className="group relative overflow-hidden rounded-lg col-span-1 md:col-span-2 lg:col-span-1">
                    <Image src={placeholderImages.gallery3.src} width={600} height={400} alt="DJ performing on a brightly lit stage" className="rounded-lg aspect-video object-cover transition-transform duration-500 group-hover:scale-110" data-ai-hint="dj stage view" />
                  </div>
                </div>
            </div>
        </section>

        {/* FAQs Section */}
        <section id="faq" className="py-20 md:py-32 bg-secondary/20 scroll-mt-20">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
              <HelpCircle className="inline-block w-10 h-10 mr-2 text-primary" />
              Your Questions, Answered
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">What if I don't get the confirmation email?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Please check your spam or promotions folder first. If you still can't find it after a few hours, contact our support at support@synvora.com with your payment details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">Can I transfer my ticket to someone else?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Tickets are non-transferable. The name on the ticket must match the attendee's ID at the venue.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">What is the refund policy?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  All ticket sales are final and non-refundable. In the unlikely case of event cancellation, you will be notified about the refund process via email.
                </AccordionContent>
              </AccordionItem>
                 <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">What kind of music can I expect?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                    Synvora features a wide range of electronic music genres, including house, techno, trance, and future bass. We curate a lineup of both world-renowned and emerging artists to create a diverse soundscape.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
}
