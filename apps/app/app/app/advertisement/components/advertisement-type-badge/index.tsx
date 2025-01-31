import type { Advertisement } from '@repo/database';
import {
  Badge,
  type BadgeProps,
} from '@repo/design-system/components/ui/badge';
import { capitalize, pipe, toLowerCase } from 'remeda';

export const AdvertisementTypeBadge = ({
  type,
}: { type: Advertisement['type'] }) => {
  const display = pipe(type, toLowerCase(), capitalize());

  const getColor = (
    type: Advertisement['type']
  ): BadgeProps['outlineColor'] => {
    switch (type) {
      case 'HTML':
        return 'blue';
      case 'IMAGE':
        return 'green';
      case 'VIDEO':
        return 'slate';
      //   case 'COMPLETED':
      //     return 'violet';
      //   case 'PAUSED':
      //     return 'red';
      default:
        return 'yellow';
    }
  };
  const color = getColor(type);
  // const className = `border-${color}-500 bg-${color}-100/25 text-${color}-700 dark:bg-${color}-900 dark:text-${color}-100`;
  return (
    <Badge variant="outline" outlineColor={color}>
      {display}
    </Badge>
  );
};
