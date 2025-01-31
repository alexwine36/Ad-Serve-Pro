import {
  ADVERTISEMENT_SIZES,
  type AdvertisementData,
} from '@repo/common-types';
import {
  Badge,
  type BadgeProps,
} from '@repo/design-system/components/ui/badge';

type SizeType = AdvertisementData['metadata']['size'];

type AdvertisementSizeBadgeProps = {
  size: SizeType;
};

export const AdvertisementSizeBadge = ({
  size,
}: AdvertisementSizeBadgeProps) => {
  const display = ADVERTISEMENT_SIZES[size];

  const getColor = (size: SizeType): BadgeProps['outlineColor'] => {
    switch (size) {
      case 'standardBanner':
        return 'teal';
      case 'largeBanner':
        return 'cyan';
      case 'largeMobileBanner':
        return 'yellow';
      //   case 'COMPLETED':
      //     return 'violet';
      //   case 'PAUSED':
      //     return 'red';
      default:
        return 'slate';
    }
  };
  const color = getColor(size);
  // const className = `border-${color}-500 bg-${color}-100/25 text-${color}-700 dark:bg-${color}-900 dark:text-${color}-100`;
  return (
    <Badge variant="outline" outlineColor={color}>
      {display.width}x{display.height}
    </Badge>
  );
};
