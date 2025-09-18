
'use server';

import { validatePaymentProof, ValidatePaymentProofInput } from '@/ai/flows/validate-payment-proof';
import { generateUniqueEventCode } from '@/ai/flows/generate-unique-event-code';
import { z } from 'zod';
import { saveRegistration } from '@/lib/db';
import { PassDetails } from '@/components/tickets/PassSelectionForm';

const processPaymentInputSchema = z.object({
  transactionId: z.string(),
  paymentScreenshotDataUri: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.string(),
  foodType: z.string(),
  passType: z.string(),
});

type ProcessPaymentInput = z.infer<typeof processPaymentInputSchema>;

export async function processPayment(
  input: ProcessPaymentInput
): Promise<{ success: boolean; eventCode?: string; error?: string }> {
  const validationResult = processPaymentInputSchema.safeParse(input);
  if (!validationResult.success) {
    console.error('Invalid input data:', validationResult.error.flatten());
    return { success: false, error: 'Invalid input data.' };
  }

  const { name, email, transactionId, paymentScreenshotDataUri, phone, gender, foodType, passType } = validationResult.data;
  
  try {
    // 1. Validate the payment proof using the AI flow.
    // This is a secure backend operation.
    const paymentValidation = await validatePaymentProof({
      userName: name,
      userEmail: email,
      transactionId,
      paymentScreenshotDataUri,
    });

    if (!paymentValidation.isValid) {
      return { success: false, error: `Payment validation failed: ${paymentValidation.reason}` };
    }

    // 2. If valid, generate a unique event code.
    const eventCodeResponse = await generateUniqueEventCode({
      userId: email,
      transactionId,
    });

    if (!eventCodeResponse.eventEntryCode) {
      return { success: false, error: 'Could not generate an event code.' };
    }
    
    // 3. Save the final, verified registration to the database.
    await saveRegistration({
      name,
      email,
      phone,
      gender,
      foodType,
      passType,
      transactionId,
      paymentScreenshotDataUri,
      eventCode: eventCodeResponse.eventEntryCode,
    });


    return { success: true, eventCode: eventCodeResponse.eventEntryCode };
  } catch (error) {
    console.error('Error processing payment:', error);
    return { success: false, error: 'An unexpected error occurred during verification.' };
  }
}
