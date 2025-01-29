'use client';

import { trpc } from '../../../../utils/trpc';
import { OrganizationForm } from './organization-form';

type OrganiztionProviderProps = {
  organizationId: string;
};
export const OrganizationProvider: React.FC<OrganiztionProviderProps> = ({
  organizationId,
}) => {
  const { data } = trpc.organization.getOne.useQuery({
    id: organizationId,
  });

  if (!data) {
    return null;
  }

  return <OrganizationForm organization={data} />;
};
