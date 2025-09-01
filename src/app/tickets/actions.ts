'use server';

import { validatePaymentProof, ValidatePaymentProofInput } from '@/ai/flows/validate-payment-proof';
import { generateUniqueEventCode } from '@/ai/flows/generate-unique-event-code';
import { z } from 'zod';

const processPaymentInputSchema = z.object({
  transactionId: z.string(),
  paymentScreenshotDataUri: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.string(),
  foodType: z.string(),
});

type ProcessPaymentInput = z.infer<typeof processPaymentInputSchema>;

export async function processPayment(
  input: ProcessPaymentInput
): Promise<{ success: boolean; eventCode?: string; error?: string }> {
  const validationResult = processPaymentInputSchema.safeParse(input);
  if (!validationResult.success) {
    return { success: false, error: 'Invalid input data.' };
  }

  const { name, email, transactionId, paymentScreenshotDataUri } = validationResult.data;

  // For the purpose of this UI demo, we will simulate a successful submission
  // without actually calling the AI verification. This gives the user instant
  // feedback on the confirmation screen. The real verification would happen
  // in the background.

  try {
    // We can still "generate" a code to show on the success screen,
    // even though the real one would be emailed later.
    const eventCodeResponse = await generateUniqueEventCode({
      userId: email,
      transactionId,
    });
    
    // In a real scenario, you would now trigger a background job to run:
    // const paymentValidation = await validatePaymentProof(paymentProofInput);
    // And if (paymentValidation.isValid), then send the real email with the code.

    if (eventCodeResponse.eventEntryCode) {
      return { success: true, eventCode: eventCodeResponse.eventEntryCode };
    } else {
      return { success: false, error: 'Could not generate a placeholder event code.' };
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
