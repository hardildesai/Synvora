'use server';

import { validatePaymentProof, ValidatePaymentProofInput } from '@/ai/flows/validate-payment-proof';
import { generateUniqueEventCode } from '@/ai/flows/generate-unique-event-code';
import { z } from 'zod';

const processPaymentInputSchema = z.object({
  transactionId: z.string(),
  paymentScreenshotDataUri: z.string(),
  name: z.string(),
  email: z.string().email(),
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

  try {
    const paymentProofInput: ValidatePaymentProofInput = {
      transactionId,
      paymentScreenshotDataUri,
      userName: name,
      userEmail: email,
    };

    const paymentValidation = await validatePaymentProof(paymentProofInput);

    if (!paymentValidation.isValid) {
      return { success: false, error: `Payment invalid: ${paymentValidation.reason}` };
    }

    // Use email as a mock userId for this example
    const eventCodeResponse = await generateUniqueEventCode({
      userId: email,
      transactionId,
    });

    if (eventCodeResponse.eventEntryCode) {
      return { success: true, eventCode: eventCodeResponse.eventEntryCode };
    } else {
      return { success: false, error: 'Could not generate event code.' };
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return { success: false, error: 'An unexpected error occurred during verification.' };
  }
}
