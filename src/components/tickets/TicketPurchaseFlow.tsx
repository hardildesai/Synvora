'use client';

import { useState } from 'react';
import type { UserDetails } from './UserDetailsForm';
import UserDetailsForm from './UserDetailsForm';
import PaymentForm from './PaymentForm';
import SuccessDisplay from './SuccessDisplay';
import { Card } from '../ui/card';

type Step = 'details' | 'payment' | 'success';

export default function TicketPurchaseFlow() {
  const [step, setStep] = useState<Step>('details');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [eventCode, setEventCode] = useState<string | null>(null);

  const handleDetailsSubmit = (data: UserDetails) => {
    setUserDetails(data);
    setStep('payment');
  };

  const handlePaymentSuccess = (code: string) => {
    setEventCode(code);
    setStep('success');
  };
  
  const handleTryAgain = () => {
    setStep('payment');
  }

  const handleGoBackToDetails = () => {
    setStep('details');
  }

  const renderStep = () => {
    switch (step) {
      case 'details':
        return <UserDetailsForm onSubmit={handleDetailsSubmit} />;
      case 'payment':
        return <PaymentForm userDetails={userDetails!} onPaymentSuccess={handlePaymentSuccess} onGoBack={handleGoBackToDetails} />;
      case 'success':
        return <SuccessDisplay eventCode={eventCode!} />;
      default:
        return <UserDetailsForm onSubmit={handleDetailsSubmit} />;
    }
  };

  return (
      <Card className="shadow-2xl animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
        {renderStep()}
      </Card>
  );
}
