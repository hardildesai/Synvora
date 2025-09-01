import { config } from 'dotenv';
config();

import '@/ai/flows/validate-payment-proof.ts';
import '@/ai/flows/generate-unique-event-code.ts';