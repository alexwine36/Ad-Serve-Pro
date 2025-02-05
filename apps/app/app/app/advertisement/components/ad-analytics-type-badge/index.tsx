import type { AnalyticsType } from '@repo/common-types';
import { capitalize, pipe, toLowerCase } from 'remeda';
import {
  Badge,
  type BadgeProps,
} from '../../../../../../../packages/design-system/components/ui/badge';

type AdAnalyticsTypeBadgeProps = {
  type: AnalyticsType;
};

export const AdAnalyticsTypeBadge = ({ type }: AdAnalyticsTypeBadgeProps) => {
  const display = pipe(type, toLowerCase(), capitalize());

  const getColor = (size: AnalyticsType): BadgeProps['outlineColor'] => {
    switch (size) {
      case 'CLICK':
        return 'indigo';
      case 'IMPRESSION':
        return 'cyan';
      case 'CONVERSION':
        return 'yellow';
      //   case 'COMPLETED':
      //     return 'violet';
      //   case 'PAUSED':
      //     return 'red';
      default:
        return 'slate';
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
