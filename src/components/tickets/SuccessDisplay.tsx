'use client';

import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2, Copy, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuccessDisplayProps {
  eventCode: string;
}

export default function SuccessDisplay({ eventCode }: SuccessDisplayProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(eventCode);
    toast({
      title: 'Copied!',
      description: 'Your event code has been copied to your clipboard.',
    });
  };

  return (
    <>
      <CardHeader className="items-center text-center">
        <PartyPopper className="w-16 h-16 text-accent mb-4" />
        <CardTitle className="font-headline text-3xl">Thank You! 🎉</CardTitle>
        <CardDescription>
          Your request has been received. You will get a confirmation email with your unique entry code (OTP) after our team verifies the payment. See you there!
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Your Verified Entry Code Will Look Like This:</p>
          <p className="text-2xl md:text-4xl font-bold font-code tracking-widest text-primary/50 break-all blur-sm select-none">
            {eventCode}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          This is just a placeholder. Your actual code will be sent via email.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full font-bold">
          Back to Top
        </Button>
      </CardFooter>
    </>
  );
}
