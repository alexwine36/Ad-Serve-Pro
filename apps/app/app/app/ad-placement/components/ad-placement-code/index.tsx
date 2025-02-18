'use client';

import type { AdPlacementData } from '@repo/common-types';
import { CodePreview } from '@repo/design-system/components/custom/code-preview';
import { Text } from '@repo/design-system/components/custom/typography';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../../../packages/design-system/components/ui/card';
import { env } from '../../../../../env';
// import './index.css';

type AdPlacementCodeProps = {
  adPlacement: AdPlacementData;
};
export const AdPlacementCode: React.FC<AdPlacementCodeProps> = ({
  adPlacement,
}) => {
  const CODE = `<!-- Place this code where you want ads to appear --> 
<ins 
 data-ad-placement="${adPlacement.id}"
></ins>`;

  const HEADER_CODE = `<!-- Place this code at the top of the <body> tag -->
<script
 id="ad-analytics"
 data-org-id="${adPlacement.organizationId}"
 src="${env.NEXT_PUBLIC_APP_URL}/analytics/client.js"
 type="module"
/>
`;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Ad Placement Code</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant={'bold'}>Head Script</Text>
          <CodePreview code={HEADER_CODE} />
          <br />
          <Text variant={'bold'}>Advertisement Tag</Text>
          <CodePreview code={CODE} />
        </CardContent>
      </Card>
    </div>
  );
};
