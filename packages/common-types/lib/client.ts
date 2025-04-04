import type { z } from 'zod';
import { ClientMetadata } from './client-metadata';
import { ClientSchema } from './generated';

export const ClientData = ClientSchema.extend({
  // Update base types here
  metadata: ClientMetadata,
});

export type ClientData = z.infer<typeof ClientData>;

export const ClientUpdateInput = ClientData.omit({
  firstSeen: true,
  lastSeen: true,
  // organizationId: true,
});

export type ClientUpdateInput = z.infer<typeof ClientUpdateInput>;

export const ClientInput = ClientUpdateInput.partial({
  id: true,
});
export type ClientInput = z.infer<typeof ClientInput>;
