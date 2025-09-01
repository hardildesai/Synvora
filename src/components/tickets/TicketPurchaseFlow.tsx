'use client';

import { useState } from 'react';
import type { UserDetails } from './UserDetailsForm';
import UserDetailsForm from './UserDetailsForm';
import PaymentForm from './PaymentForm';
import SuccessDisplay from './SuccessDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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

  const renderStep = () => {
    switch (step) {
      case 'details':
        return <UserDetailsForm onSubmit={handleDetailsSubmit} />;
      case 'payment':
        return <PaymentForm userDetails={userDetails!} onPaymentSuccess={handlePaymentSuccess} onTryAgain={handleTryAgain} />;
      case 'success':
        return <SuccessDisplay eventCode={eventCode!} />;
      default:
        return <UserDetailsForm onSubmit={handleDetailsSubmit} />;
    }
  };

  const getStepIndex = () => {
    switch (step) {
      case 'details': return 1;
      case 'payment': return 2;
      case 'success': return 3;
      default: return 1;
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-primary">Step {getStepIndex()} of 3</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(getStepIndex() / 3) * 100}%`, transition: 'width 0.5s ease-in-out' }}></div>
          </div>
      </div>
      <Card className="shadow-2xl animate-in fade-in-50 duration-500">
        {renderStep()}
      </Card>
    </div>
  );
}
