import {
  ADVERTISEMENT_SIZES,
  type AdvertisementData,
} from '@repo/common-types';
import { Text } from '@repo/design-system/components/custom/typography';
import { Badge } from '@repo/design-system/components/ui/badge';
import { AdvertisementSizeBadge } from '../advertisement-size-badge';
import { AdvertisementTypeBadge } from '../advertisement-type-badge';

type AdvertisementContentProps = Pick<
  AdvertisementData,
  'type' | 'content' | 'isActive'
> & {
  metadata: Pick<AdvertisementData['metadata'], 'size'>;
  children?: React.ReactNode;
  title?: React.ReactNode;
};
export const AdvertisementContent: React.FC<AdvertisementContentProps> = ({
  type,
  content,
  metadata,
  children,
  isActive,
  title,
}) => {
  const imgSize = ADVERTISEMENT_SIZES[metadata.size];

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 rounded-md border p-2">
        {title ? (
          title
        ) : (
          <div className="flex items-center gap-2">
            <Text variant="lead">Preview</Text> {children}
          </div>
        )}

        <img
          src={content}
          alt={type}
          width={imgSize.width}
          height={imgSize.height}
        />
        <div className="flex justify-evenly gap-2">
          {isActive ? (
            <Badge variant="outline" outlineColor="green">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" outlineColor="red">
              Inactive
            </Badge>
          )}
          <AdvertisementSizeBadge size={metadata.size} />
          <AdvertisementTypeBadge type={type} />
        </div>
      </div>
    </div>
  );
};
