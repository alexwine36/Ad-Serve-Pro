import {
  ADVERTISEMENT_SIZES,
  type AdvertisementData,
} from '@repo/common-types';
import { Text } from '@repo/design-system/components/custom/typography';
import { AdvertisementSizeBadge } from '../advertisement-size-badge';
import { AdvertisementTypeBadge } from '../advertisement-type-badge';

type AdvertisementContentProps = Pick<AdvertisementData, 'type' | 'content'> & {
  metadata: Pick<AdvertisementData['metadata'], 'size'>;
};
export const AdvertisementContent: React.FC<AdvertisementContentProps> = ({
  type,
  content,
  metadata,
}) => {
  const imgSize = ADVERTISEMENT_SIZES[metadata.size];

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 rounded-md border p-2">
        <Text variant="lead">Preview</Text>
        <img
          src={content}
          alt={type}
          width={imgSize.width}
          height={imgSize.height}
        />
        <div className="flex gap-2">
          <AdvertisementSizeBadge size={metadata.size} />
          <AdvertisementTypeBadge type={type} />
        </div>
      </div>
    </div>
  );
};
