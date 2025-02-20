'use client';

import type { AdPlacementData } from '@repo/common-types';
import { CodePreview } from '@repo/design-system/components/custom/code-preview';
import { Text } from '@repo/design-system/components/custom/typography';
// import './index.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/design-system/components/ui/accordion';
import { Card, CardContent } from '@repo/design-system/components/ui/card';
import { env } from '../../../../../env';
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
    <Card className="w-full max-w-prose">
      <CardContent>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Ad Placement Code</AccordionTrigger>
              <AccordionContent>
                <Text variant={'bold'}>Head Script</Text>
                <CodePreview code={HEADER_CODE} />
                <br />
                <Text variant={'bold'}>Advertisement Tag</Text>
                <CodePreview code={CODE} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <Card>
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
      </Card> */}
        </div>
      </CardContent>
    </Card>
  );
};
