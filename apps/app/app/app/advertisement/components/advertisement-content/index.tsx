'use client';

import {
  ADVERTISEMENT_SIZES,
  type AdvertisementData,
} from '@repo/common-types';
import { Text } from '@repo/design-system/components/custom/typography';
import { Badge } from '@repo/design-system/components/ui/badge';
import { useState } from 'react';
import { trpc } from '../../../../../utils/trpc';
import { AdvertisementDialog } from '../advertisement-dialog';
import { AdvertisementSizeBadge } from '../advertisement-size-badge';
import { AdvertisementTypeBadge } from '../advertisement-type-badge';

type AdvertisementContentProps = Pick<AdvertisementData, 'id' | 'companyId'> & {
  metadata: Pick<AdvertisementData['metadata'], 'size'>;
  children?: React.ReactNode;
  title?: React.ReactNode;
  editable?: boolean;
};
export const AdvertisementContent: React.FC<AdvertisementContentProps> = ({
  id,
  metadata,
  children,

  title,
  editable,
}) => {
  const { data } = trpc.advertisement.getOne.useQuery({
    id,
  });
  const imgSize = ADVERTISEMENT_SIZES[metadata.size];
  const [open, setOpen] = useState(false);
  if (!data) {
    return null;
  }
  const { content, name, type, isActive } = data;
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 rounded-md border p-2">
        {title ? (
          title
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <Text variant="lead">Preview</Text>{' '}
              {editable && (
                <AdvertisementDialog
                  open={open}
                  companyId={data.companyId}
                  advertisement={data}
                  onOpenChange={setOpen}
                  showTrigger
                />
              )}{' '}
              {children}
            </div>

            <div>
              <Text variant="muted" size={'sm'}>
                {name}
              </Text>
            </div>
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
