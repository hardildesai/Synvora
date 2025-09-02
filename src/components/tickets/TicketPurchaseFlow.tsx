'use client';

import { useState } from 'react';
import type { UserDetails } from './UserDetailsForm';
import UserDetailsForm from './UserDetailsForm';
import PaymentForm from './PaymentForm';
import SuccessDisplay from './SuccessDisplay';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import PassSelectionForm, { PassDetails } from './PassSelectionForm';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

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
      <Card className="shadow-2xl animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="shadow-2xl animate-in fade-in-50 duration-500 bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">Authentication Required</CardTitle>
          <CardDescription className="text-center">
            You need to be logged in to book tickets.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>Please log in to your account or create a new one to continue.</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Sign Up</Link>
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
