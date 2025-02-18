import type { AdPlacementData } from '@repo/common-types';
import { Heading } from '@repo/design-system/components/custom/typography';

type AdPlacementStatsProps = {
  adPlacement: AdPlacementData;
};

export const AdPlacementStats: React.FC<AdPlacementStatsProps> = ({
  adPlacement,
}) => {
  return (
    <div className=" bg-muted">
      <Heading level={2}>
        Ad Placement <br />
        Stats
      </Heading>
    </div>
  );
};
