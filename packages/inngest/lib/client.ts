import { EventSchemas, Inngest } from 'inngest';
import { ZodEvents } from './functions/types';

// Create a client to send and receive events
export const inngest = new Inngest({
  id: 'my-app',
  schemas: new EventSchemas().fromZod(ZodEvents),
});
