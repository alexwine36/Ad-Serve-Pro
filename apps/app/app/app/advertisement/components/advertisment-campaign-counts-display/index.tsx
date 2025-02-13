import type { AdvertisementCampaignCounts } from '@repo/common-types';
import { Badge } from '@repo/design-system/components/ui/badge';
import { cn } from '@repo/design-system/lib/utils';
import { entries, values } from 'remeda';
import { getCampaignStatusColor } from '../../../campaign/components/campaign-status-badge';
// import './index.module.css';

type AdvertisementCampaignCountsProps = {
  campaignCounts?: AdvertisementCampaignCounts;
  includeInactive?: boolean;
};
export const AdvertisementCampaignCountsDisplay: React.FC<
  AdvertisementCampaignCountsProps
> = ({ campaignCounts, includeInactive }) => {
  const { ACTIVE = 0, COMPLETED = 0, SCHEDULED = 0 } = campaignCounts || {};
  const campaignDisplay: AdvertisementCampaignCounts = {
    ACTIVE,
    COMPLETED,
    SCHEDULED,
    ...(includeInactive
      ? {
          ...campaignCounts,
        }
      : {}),
  };
  if (!campaignCounts) {
    return null;
  }
  const opts = entries(campaignDisplay);
  return (
    <div className="count-display flex flex-col">
      <Badge
        className="justify-center rounded-b-none rounded-b-sm border-b-none"
        variant="outline"
        outlineColor={'slate'}
      >
        Total: {values(campaignDisplay).reduce((acc, curr) => acc + curr, 0)}
      </Badge>
      <div className="flex ">
        {opts.map(([key, value], idx) => (
          // <div key={key}>
          //   {key}: {value}
          // </div>
          <Badge
            className={cn(
              'w-full justify-center rounded-none rounded-t-none border-t-0',
              idx === 0 ? 'rounded-bl-md' : '',
              idx === opts.length - 1 ? 'rounded-br-md' : ''
            )}
            key={key}
            variant="outline"
            outlineColor={getCampaignStatusColor(key)}
          >
            {value}
          </Badge>
        ))}
      </div>
    </div>
  );
};
