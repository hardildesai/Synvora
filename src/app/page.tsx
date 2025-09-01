import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Music, Star, User, HelpCircle, Mail, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HeroScroll from '@/components/HeroScroll';
import CountdownTimer from '@/components/CountdownTimer';

export default function Home() {
  const eventDate = '2024-09-20T18:30:00';

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow">
        <div className="relative z-0">
          <HeroScroll>
            {/* Event Info Section */}
            <section id="info" className="py-20 scroll-mt-20">
              <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-accent mb-4">The Vision of Synvora</h2>
                <p className="max-w-3xl mx-auto text-neutral-300 mb-12">
                  Synvora is not just an event; it's a convergence of sound, art, and soul. We aim to create a world-class experience that transcends the ordinary, bringing together a community of music lovers to celebrate life and creativity under a starlit sky.
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Card className="bg-card/80 backdrop-blur-sm border-primary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center gap-3 font-headline text-primary"><Calendar className="w-8 h-8"/>Date</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-lg font-bold">20th September</p></CardContent>
                  </Card>
                  <Card className="bg-card/80 backdrop-blur-sm border-primary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center gap-3 font-headline text-primary"><Clock className="w-8 h-8"/>Time</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-lg font-bold">6:30 PM Onwards</p></CardContent>
                  </Card>
                  <Card className="bg-card/80 backdrop_blur-sm border-primary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center gap-3 font-headline text-primary"><MapPin className="w-8 h-8"/>Venue</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-lg font-bold">Venue TBD</p></CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-20 bg-secondary/20 scroll-mt-20">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-accent">Gallery & Aftermovie Teaser</h2>
                    <div className="grid md:grid-cols-2 gap-4 mt-8">
                      <Image src="https://picsum.photos/600/400" width={600} height={400} alt="Event Teaser 1" className="rounded-lg" data-ai-hint="music festival" />
                      <Image src="https://picsum.photos/600/400" width={600} height={400} alt="Event Teaser 2" className="rounded-lg" data-ai-hint="concert crowd" />
                    </div>
                </div>
            </section>

            {/* Meet the Team Section */}
            <section id="team" className="py-20 bg-black scroll-mt-20">
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-accent">Meet The Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  <Card className="text-center bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                    <CardHeader>
                      <Image src="https://picsum.photos/200/200" width={120} height={120} alt="Team Member 1" className="rounded-full mx-auto mb-4 border-4 border-primary/50" data-ai-hint="person portrait" />
                      <CardTitle className="font-headline text-xl">Hardil Desai</CardTitle>
                      <p className="text-sm text-primary font-semibold">Founder & Creative Director</p>
                    </CardHeader>
                    <CardContent className="flex justify-center gap-4">
                      <Link href="#"><Mail className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                    </CardContent>
                  </Card>
                  <Card className="text-center bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                    <CardHeader>
                      <Image src="https://picsum.photos/200/200" width={120} height={120} alt="Team Member 2" className="rounded-full mx-auto mb-4 border-4 border-primary/50" data-ai-hint="person portrait" />
                      <CardTitle className="font-headline text-xl">Amshith Nair</CardTitle>
                      <p className="text-sm text-primary font-semibold">Co-founder & Tech Head</p>
                    </CardHeader>
                    <CardContent className="flex justify-center gap-4">
                      <Link href="#"><Mail className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                    </CardContent>
                  </Card>
                  <Card className="text-center bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                    <CardHeader>
                      <Image src="https://picsum.photos/200/200" width={120} height={120} alt="Team Member 3" className="rounded-full mx-auto mb-4 border-4 border-primary/50" data-ai-hint="person portrait" />
                      <CardTitle className="font-headline text-xl">Parth</CardTitle>
                      <p className="text-sm text-primary font-semibold">Media Head</p>
                    </CardHeader>
                    <CardContent className="flex justify-center gap-4">
                      <Link href="#"><Mail className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                    </CardContent>
                  </Card>
                  <Card className="text-center bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                    <CardHeader>
                      <Image src="https://picsum.photos/200/200" width={120} height={120} alt="Team Member 4" className="rounded-full mx-auto mb-4 border-4 border-primary/50" data-ai-hint="person portrait" />
                      <CardTitle className="font-headline text-xl">Vanshika</CardTitle>
                      <p className="text-sm text-primary font-semibold">Social Media</p>
                    </CardHeader>
                    <CardContent className="flex justify-center gap-4">
                      <Link href="#"><Mail className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                      <Link href="#"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                    </CardContent>
                  </Card>
                  <div className="lg:col-span-4 flex justify-center">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-3/4">
                        <Card className="text-center bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                            <CardHeader>
                            <Image src="https://picsum.photos/200/200" width={120} height={120} alt="Team Member 5" className="rounded-full mx-auto mb-4 border-4 border-primary/50" data-ai-hint="person portrait" />
                            <CardTitle className="font-headline text-xl">Nitya</CardTitle>
                            <p className="text-sm text-primary font-semibold">Social Media</p>
                            </CardHeader>
                            <CardContent className="flex justify-center gap-4">
                            <Link href="#"><Mail className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            <Link href="#"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            <Link href="#"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            </CardContent>
                        </Card>
                        <Card className="text-center bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                            <CardHeader>
                            <Image src="https://picsum.photos/200/200" width={120} height={120} alt="Team Member 6" className="rounded-full mx-auto mb-4 border-4 border-primary/50" data-ai-hint="person portrait" />
                            <CardTitle className="font-headline text-xl">Preet</CardTitle>
                            <p className="text-sm text-primary font-semibold">Promotion</p>
                            </CardHeader>
                            <CardContent className="flex justify-center gap-4">
                            <Link href="#"><Mail className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            <Link href="#"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            <Link href="#"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            </CardContent>
                        </Card>
                        <Card className="text-center bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-primary/30 hover:border-primary">
                            <CardHeader>
                            <Image src="https://picsum.photos/200/200" width={120} height={120} alt="Team Member 7" className="rounded-full mx-auto mb-4 border-4 border-primary/50" data-ai-hint="person portrait" />
                            <CardTitle className="font-headline text-xl">Aaryan</CardTitle>
                            <p className="text-sm text-primary font-semibold">Promotion</p>
                            </CardHeader>
                            <CardContent className="flex justify-center gap-4">
                            <Link href="#"><Mail className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            <Link href="#"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            <Link href="#"><Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary"/></Link>
                            </CardContent>
                        </Card>
                      </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section id="faq" className="py-20 bg-secondary/20 scroll-mt-20">
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
            
            {/* Contact Section */}
            <section id="contact" className="py-20 bg-black scroll-mt-20">
              <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-accent mb-4">Get In Touch</h2>
                <p className="max-w-2xl mx-auto text-neutral-300 mb-8">
                  Have questions or want to partner with us? Reach out!
                </p>
                <div className="flex justify-center items-center gap-8">
                  <Link href="mailto:support@synvora.com" className="text-lg font-semibold flex items-center gap-2 text-muted-foreground hover:text-primary">
                    <Mail />
                    support@synvora.com
                  </Link>
                  <div className="flex items-center gap-4">
                    <Link href="#"><Twitter className="w-7 h-7 text-muted-foreground hover:text-primary"/></Link>
                    <Link href="#"><Linkedin className="w-7 h-7 text-muted-foreground hover:text-primary"/></Link>
                  </div>
                </div>
              </div>
            </section>
          </HeroScroll>
        </div>
      </main>
    </div>
  );
}
