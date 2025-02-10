import type { AdvertisementCampaignCounts } from '@repo/common-types';
import { Badge } from '@repo/design-system/components/ui/badge';
import { entries, values } from 'remeda';
import { getCampaignStatusColor } from '../../../campaign/components/campaign-status-badge';
// import './index.module.css';

type AdvertisementCampaignCountsProps = {
  campaignCounts?: AdvertisementCampaignCounts;
};
export const AdvertisementCampaignCountsDisplay: React.FC<
  AdvertisementCampaignCountsProps
> = ({ campaignCounts }) => {
  const campaignDisplay: AdvertisementCampaignCounts = {
    ACTIVE: 0,
    COMPLETED: 0,
    SCHEDULED: 0,
    ...campaignCounts,
  };
  if (!campaignCounts) {
    return null;
  }

  return (
    <div className="count-display flex flex-col">
      <Badge
        className="justify-center rounded-b-none rounded-b-sm border-b-none"
        variant="outline"
        outlineColor={'slate'}
      >
        Total: {values(campaignDisplay).reduce((acc, curr) => acc + curr, 0)}
      </Badge>
      <div className="flex [&>:first-of-type]:rounded-tl-none [&>:first-of-type]:rounded-br-sm [&>:last-of-type]:rounded-tr-none">
        {entries(campaignDisplay).map(([key, value]) => (
          // <div key={key}>
          //   {key}: {value}
          // </div>
          <Badge
            className="w-full justify-center rounded-t-sm border-t-0 "
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
