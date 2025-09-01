'use server';

/**
 * @fileOverview Payment proof validation flow.
 *
 * - validatePaymentProof - A function that validates payment proof using LLM.
 * - ValidatePaymentProofInput - The input type for the validatePaymentProof function.
 * - ValidatePaymentProofOutput - The return type for the validatePaymentProof function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const ValidatePaymentProofInputSchema = z.object({
  transactionId: z
    .string()
    .describe('The transaction ID provided by the user.'),
  paymentScreenshotDataUri: z
    .string()
    .describe(
      "A screenshot of the payment as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userName: z.string().describe('The name of the user.'),
  userEmail: z.string().email().describe('The email of the user.'),
});
export type ValidatePaymentProofInput = z.infer<typeof ValidatePaymentProofInputSchema>;

const ValidatePaymentProofOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the payment proof is valid or not.'),
  reason: z.string().describe('The reason for the validation result.'),
});
export type ValidatePaymentProofOutput = z.infer<typeof ValidatePaymentProofOutputSchema>;

export async function validatePaymentProof(input: ValidatePaymentProofInput): Promise<ValidatePaymentProofOutput> {
  return validatePaymentProofFlow(input);
}

const validatePaymentProofPrompt = ai.definePrompt({
  name: 'validatePaymentProofPrompt',
  input: {
    schema: ValidatePaymentProofInputSchema,
  },
  output: {
    schema: ValidatePaymentProofOutputSchema,
  },
  prompt: `You are an expert payment validator. Your task is to determine if a payment proof is valid based on the provided transaction ID and payment screenshot.

  User Name: {{{userName}}}
  User Email: {{{userEmail}}}
  Transaction ID: {{{transactionId}}}
  Payment Screenshot: {{media url=paymentScreenshotDataUri}}

  Determine if the payment proof is valid. Consider factors such as the clarity of the screenshot, the presence of a valid transaction ID, and whether the information provided seems consistent and legitimate.  If the transaction ID seems suspicious, or if the screenshot is of low quality or does not appear to be a valid payment confirmation, you should consider the payment proof invalid. If you are not sure, consider the payment proof invalid.

  Return your answer in JSON format with the following schema: {"isValid": boolean, "reason": string}. Be brief in the reason.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const validatePaymentProofFlow = ai.defineFlow(
  {
    name: 'validatePaymentProofFlow',
    inputSchema: ValidatePaymentProofInputSchema,
    outputSchema: ValidatePaymentProofOutputSchema,
  },
  async input => {
    const {output} = await validatePaymentProofPrompt(input);
    return output!;
  }
);
