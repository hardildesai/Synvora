'use client';

import { useState } from 'react';
import type { UserDetails } from './UserDetailsForm';
import UserDetailsForm from './UserDetailsForm';
import PaymentForm from './PaymentForm';
import SuccessDisplay from './SuccessDisplay';
import { Card } from '../ui/card';
import PassSelectionForm, { PassDetails } from './PassSelectionForm';

type Step = 'pass' | 'details' | 'payment' | 'success';

export default function TicketPurchaseFlow() {
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
  }

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

  return (
      <Card className="shadow-2xl animate-in fade-in-50 duration-500 bg-transparent border-none shadow-none">
        {renderStep()}
      </Card>
  );
}
