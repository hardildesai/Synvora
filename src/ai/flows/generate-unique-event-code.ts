'use server';
/**
 * @fileOverview Flow to generate a unique event entry code for each user upon successful payment verification.
 *
 * - generateUniqueEventCode - A function that generates a unique event entry code.
 * - GenerateUniqueEventCodeInput - The input type for the generateUniqueEventCode function.
 * - GenerateUniqueEventCodeOutput - The return type for the generateUniqueEventCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUniqueEventCodeInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  transactionId: z.string().describe('The transaction ID of the payment.'),
});
export type GenerateUniqueEventCodeInput = z.infer<typeof GenerateUniqueEventCodeInputSchema>;

const GenerateUniqueEventCodeOutputSchema = z.object({
  eventEntryCode: z.string().describe('The unique event entry code for the user.'),
});
export type GenerateUniqueEventCodeOutput = z.infer<typeof GenerateUniqueEventCodeOutputSchema>;

export async function generateUniqueEventCode(input: GenerateUniqueEventCodeInput): Promise<GenerateUniqueEventCodeOutput> {
  return generateUniqueEventCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUniqueEventCodePrompt',
  input: {schema: GenerateUniqueEventCodeInputSchema},
  output: {schema: GenerateUniqueEventCodeOutputSchema},
  prompt: `Generate a unique, secure, and trackable event entry code for the user with ID {{{userId}}} who made a payment with transaction ID {{{transactionId}}}. The code should be alphanumeric and at least 12 characters long.`,
});

const generateUniqueEventCodeFlow = ai.defineFlow(
  {
    name: 'generateUniqueEventCodeFlow',
    inputSchema: GenerateUniqueEventCodeInputSchema,
    outputSchema: GenerateUniqueEventCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
