'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserDetails } from './UserDetailsForm';
import { processPayment } from '@/app/tickets/actions';
import { Loader2, Upload, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const paymentFormSchema = z.object({
  transactionId: z.string().min(5, 'Transaction ID seems too short.'),
  paymentScreenshot: z.any().refine((files) => files?.length === 1, 'Payment screenshot is required.'),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  userDetails: UserDetails;
  onPaymentSuccess: (code: string) => void;
  onGoBack: () => void;
}

export default function PaymentForm({ userDetails, onPaymentSuccess, onGoBack }: PaymentFormProps) {
  const { toast } = useToast();
  const [screenshotDataUri, setScreenshotDataUri] = useState<string | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  });
  
  const fileRef = form.register('paymentScreenshot');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: PaymentFormData) => {
    if (!screenshotDataUri) {
      toast({
        variant: 'destructive',
        title: 'Missing Screenshot',
        description: 'Please upload a screenshot of your payment.',
      });
      return;
    }
    
    setIsProcessing(true);

    const result = await processPayment({
      ...userDetails,
      transactionId: data.transactionId,
      paymentScreenshotDataUri: screenshotDataUri,
    });

    setIsProcessing(false);

    if (result.success && result.eventCode) {
      onPaymentSuccess(result.eventCode);
    } else {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: result.error || 'Please check your details and try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={onGoBack} className="flex-shrink-0">
              <ArrowLeft />
            </Button>
            <div>
              <CardTitle className="font-headline text-xl">2. Payment & Verification</CardTitle>
              <CardDescription>Scan, pay, and upload proof.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center bg-white p-4 rounded-lg">
            <Image
              src="https://picsum.photos/300/300"
              alt="Payment QR Code"
              width={250}
              height={250}
              data-ai-hint="qr code"
              className="rounded-md"
            />
          </div>
          <Alert>
            <AlertTitle className="font-semibold">Important!</AlertTitle>
            <AlertDescription>
            Upload a screenshot with the transaction ID clearly visible. Verification is manual and may take some time.
            </AlertDescription>
          </Alert>
          <FormField
            control={form.control}
            name="transactionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the ID from your payment app" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentScreenshot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Screenshot</FormLabel>
                 <FormControl>
                  <div className="relative">
                    <Input id="paymentScreenshot" type="file" accept="image/*" {...fileRef} onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {screenshotPreview && (
            <div className="mt-4">
              <Image src={screenshotPreview} alt="Screenshot preview" width={200} height={400} className="rounded-md object-contain mx-auto border-2 border-dashed border-primary/50 p-2" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full font-bold" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Submit for Verification'
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
