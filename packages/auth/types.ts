import type { MemberRole } from '@repo/database';
import type { Session as DefaultSession } from 'next-auth';

export interface User {
  name: string;
  email: string;
  image: string;
  initials: string;
  currentOrganizationId?: string;
  currentRole?: MemberRole;
}

export interface Session extends DefaultSession {
  user: User;
}
