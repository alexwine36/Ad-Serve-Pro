import type { CampaignData } from '@repo/common-types';
import {
  Badge,
  type BadgeProps,
} from '@repo/design-system/components/ui/badge';
import { capitalize, pipe, toLowerCase } from 'remeda';

export const getCampaignStatusColor = (
  status: CampaignData['status']
): BadgeProps['outlineColor'] => {
  switch (status) {
    case 'DRAFT':
      return 'blue';
    case 'ACTIVE':
      return 'green';
    case 'CANCELLED':
      return 'slate';
    case 'COMPLETED':
      return 'violet';
    case 'PAUSED':
      return 'red';
    default:
      return 'yellow';
  }
};

export const CampaignStatusBadge = ({
  status,
}: { status: CampaignData['status'] }) => {
  const display = pipe(status, toLowerCase(), capitalize());

  const color = getCampaignStatusColor(status);
  // const className = `border-${color}-500 bg-${color}-100/25 text-${color}-700 dark:bg-${color}-900 dark:text-${color}-100`;
  return (
    <Badge variant="outline" outlineColor={color}>
      {display}
    </Badge>
  );
};
