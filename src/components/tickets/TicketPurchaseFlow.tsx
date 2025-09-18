
'use client';

import { useState } from 'react';
import type { UserDetails } from './UserDetailsForm';
import UserDetailsForm from './UserDetailsForm';
import PaymentForm from './PaymentForm';
import SuccessDisplay from './SuccessDisplay';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import PassSelectionForm, { PassDetails } from './PassSelectionForm';
import { Loader2, Ticket } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

type Step = 'pass' | 'details' | 'payment' | 'success';

export default function TicketPurchaseFlow() {
  const { user, loading } = useAuth();
  const [step, setStep] = useState<Step>('pass');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [eventCode, setEventCode] = useState<string | null>(null);
  const [passDetails, setPassDetails] = useState<PassDetails | null>(null);

  const handlePassSubmit = (data: PassDetails) => {
    setPassDetails(data);
    setStep('details');
  };

  const handleDetailsSubmit = (data: UserDetails) => {
    setUserDetails(data);
    setStep('payment');
  };

  const handlePaymentSuccess = (code: string) => {
    setEventCode(code);
    setStep('success');
  };

  const handleGoBackToDetails = () => {
    setStep('details');
  };

  const handleGoBackToPass = () => {
    setStep('pass');
  };

  const renderStep = () => {
    switch (step) {
      case 'pass':
        return <PassSelectionForm onSubmit={handlePassSubmit} />;
      case 'details':
        return <UserDetailsForm onSubmit={handleDetailsSubmit} onGoBack={handleGoBackToPass} passDetails={passDetails!} />;
      case 'payment':
        return <PaymentForm userDetails={userDetails!} onPaymentSuccess={handlePaymentSuccess} onGoBack={handleGoBackToDetails} passDetails={passDetails!} />;
      case 'success':
        return <SuccessDisplay eventCode={eventCode!} />;
      default:
        return <PassSelectionForm onSubmit={handlePassSubmit} />;
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none flex items-center justify-center p-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="shadow-2xl animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
        <CardHeader className="text-center items-center">
            <Ticket className="w-12 h-12 text-primary mb-2" />
          <CardTitle className="font-headline text-2xl">Sign In Required</CardTitle>
          <CardDescription>Please sign in or create an account to book your tickets.</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-4">
          <Button asChild className="w-full font-bold">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/register">Create an Account</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
      <Card className="shadow-2xl animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
        {renderStep()}
      </Card>
  );
}
