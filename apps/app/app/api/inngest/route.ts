import { inngest } from '@repo/inngest/lib/client';
import { inngestFunctions } from '@repo/inngest/lib/functions';
import { serve } from 'inngest/next';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: inngestFunctions,
});
