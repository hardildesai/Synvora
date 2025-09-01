'use client';

import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2, Copy } from 'lucide-react';
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
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <CardTitle className="font-headline text-3xl">Payment Successful!</CardTitle>
        <CardDescription>
          Your ticket is confirmed! Here is your unique event entry code. It has also been sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-2xl md:text-4xl font-bold font-code tracking-widest text-primary break-all">
            {eventCode}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopy} className="w-full font-bold">
          <Copy className="mr-2 h-4 w-4" />
          Copy Code
        </Button>
      </CardFooter>
    </>
  );
}
