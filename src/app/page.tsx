
import { Button } from '@/components/ui/button';
import { HelpCircle, Music, Zap, Ticket as TicketIcon, Utensils, Award, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CountdownTimer from '@/components/CountdownTimer';
import placeholderImages from '@/lib/placeholder-images.json';
import FluidGradient from '@/components/FluidGradient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/ContactForm';

const artists = [
    { name: 'AXWELL', genre: 'House', img: placeholderImages.artist1.src },
    { name: 'HARDWELL', genre: 'Big Room', img: placeholderImages.artist2.src },
    { name: 'SKRILLEX', genre: 'Dubstep', img: placeholderImages.artist3.src },
    { name: 'ARMIN VAN BUUREN', genre: 'Trance', img: placeholderImages.artist4.src },
    { name: 'CHARLOTTE DE WITTE', genre: 'Techno', img: placeholderImages.artist5.src },
    { name: 'SUBTRONICS', genre: 'Riddim', img: placeholderImages.artist6.src },
];

const sponsors = [
  { name: 'Sponsor 1', logo: placeholderImages.sponsor1.src },
  { name: 'Sponsor 2', logo: placeholderImages.sponsor2.src },
  { name: 'Sponsor 3', logo: placeholderImages.sponsor3.src },
  { name: 'Sponsor 4', logo: placeholderImages.sponsor4.src },
];


export default function Home() {

  const eventDate = '2024-09-20T18:30:00';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="relative z-0">

        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
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
                      <Link href="/tickets">Book Tickets Now</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 scroll-mt-20">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
             <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">First Chapter</span>
            </h2>
            <p className="text-lg text-muted-foreground">
                Welcome to Synvora, the first edition of a new legend in the music festival circuit. Born from a desire to merge sound, art, and soul, Synvora is more than just a festival—it's an immersive reality. We feature a diverse lineup of world-class artists across electronic genres like house, techno, trance, and dubstep, all set against a backdrop of cutting-edge visual production. Prepare to lose yourself in a world where sound becomes legend.
            </p>
          </div>
        </section>

        {/* Lineup Section */}
        <section id="lineup" className="py-20 md:py-32 bg-secondary/20 scroll-mt-20">
            <div className="container px-4 md:px-6">
                 <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
                    <Music className="inline-block w-10 h-10 mr-2 text-primary" />
                    Artist Lineup
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {artists.map(artist => (
                        <div key={artist.name} className="group relative overflow-hidden rounded-lg text-center">
                            <Image src={artist.img} width={300} height={400} alt={`Artist ${artist.name}`} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" data-ai-hint="portrait artist" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                <h3 className="font-bold text-lg text-white">{artist.name}</h3>
                                <p className="text-sm text-primary font-semibold">{artist.genre}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-center text-muted-foreground mt-8 text-sm">*More artists to be announced soon.</p>
            </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-32 scroll-mt-20">
            <div className="container px-4 md:px-6">
                 <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
                    <Zap className="inline-block w-10 h-10 mr-2 text-accent" />
                    The Experience
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <Image src={placeholderImages.experience1.src} width={400} height={300} alt="LED Walls" className="rounded-lg mb-4" data-ai-hint="festival led wall" />
                        <h3 className="text-xl font-bold mb-2">Massive LED Walls</h3>
                        <p className="text-muted-foreground">Lose yourself in visuals that sync with every beat on our colossal stage screens.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src={placeholderImages.experience2.src} width={400} height={300} alt="Laser Show" className="rounded-lg mb-4" data-ai-hint="festival laser show" />
                        <h3 className="text-xl font-bold mb-2">State-of-the-Art Lasers</h3>
                        <p className="text-muted-foreground">A symphony of light that cuts through the night, creating a truly immersive spectacle.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src={placeholderImages.experience3.src} width={400} height={300} alt="Food Stalls" className="rounded-lg mb-4" data-ai-hint="festival food stall" />
                        <h3 className="text-xl font-bold mb-2">Gourmet Food Stalls</h3>
                        <p className="text-muted-foreground">Refuel with a diverse range of delicious food and drinks to keep you dancing.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Tickets Section */}
        <section id="tickets" className="py-20 md:py-32 bg-secondary/20 scroll-mt-20">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
                    <TicketIcon className="inline-block w-10 h-10 mr-2 text-primary" />
                    Get Your Passes
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="flex flex-col text-center p-6 bg-card/80">
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold text-accent">General Pass</CardTitle>
                          <CardDescription>Event entry. Food not included.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-4xl font-extrabold mb-4">₹550</p>
                        </CardContent>
                        <CardFooter>
                           <Button asChild className="w-full font-bold"><Link href="/tickets">Buy Now</Link></Button>
                        </CardFooter>
                    </Card>
                     <Card className="flex flex-col text-center p-6 bg-card/80 border-primary shadow-primary/20 shadow-lg scale-105">
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold text-accent">General Pass + Food</CardTitle>
                          <CardDescription>Event entry with a food coupon.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-4xl font-extrabold mb-4">₹700</p>
                        </CardContent>
                        <CardFooter>
                           <Button asChild className="w-full font-bold"><Link href="/tickets">Buy Now</Link></Button>
                        </CardFooter>
                    </Card>
                     <Card className="flex flex-col text-center p-6 bg-card/80">
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold text-accent">Couples Entry + Food</CardTitle>
                          <CardDescription>Entry for two with food coupons.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-4xl font-extrabold mb-4">₹1200</p>
                        </CardContent>
                        <CardFooter>
                           <Button asChild className="w-full font-bold"><Link href="/tickets">Buy Now</Link></Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 md:py-32 scroll-mt-20">
            <div className="container px-4 md:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
                    Past <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Inspirations</span>
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

        {/* Sponsors Section */}
        <section id="sponsors" className="py-20 md:py-32 bg-secondary/20 scroll-mt-20">
            <div className="container px-4 md:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
                    <Award className="inline-block w-10 h-10 mr-2 text-primary" />
                    Our Partners
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {sponsors.map((sponsor) => (
                        <Image key={sponsor.name} src={sponsor.logo} width={150} height={50} alt={sponsor.name} className="object-contain" data-ai-hint="company logo" />
                    ))}
                </div>
            </div>
        </section>

        {/* FAQs Section */}
        <section id="faq" className="py-20 md:py-32 scroll-mt-20">
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
        
        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 bg-secondary/20 scroll-mt-20">
            <div className="container px-4 md:px-6 max-w-3xl mx-auto">
                 <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-headline">
                    <Mail className="inline-block w-10 h-10 mr-2 text-accent" />
                    Get In Touch
                </h2>
                <ContactForm />
            </div>
        </section>
      </main>
    </div>
  );
}
