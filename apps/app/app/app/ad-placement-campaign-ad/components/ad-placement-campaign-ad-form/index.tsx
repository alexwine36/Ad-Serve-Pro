'use client';

import { trpc } from '@/utils/trpc';
import {
  type AdPlacementCampaignAdData,
  AdPlacementCampaignAdInput,
  getSchemaDefaults,
} from '@repo/common-types';
import {
  Form,
  FormInput,
  zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import type { AdPlacementCampaignAdTypes } from '../ad-placement-campaign-ad-types';

type AdPlacementCampaignAdFormProps = AdPlacementCampaignAdTypes & {
  onSuccess: (value: AdPlacementCampaignAdData) => void;
  adPlacementCampaignAd?: AdPlacementCampaignAdData;
};

export const AdPlacementCampaignAdForm: React.FC<
  AdPlacementCampaignAdFormProps
> = ({ adPlacementCampaignAd, onSuccess }) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<AdPlacementCampaignAdInput>({
    resolver: zodResolver(AdPlacementCampaignAdInput),
    defaultValues: {
      ...getSchemaDefaults(AdPlacementCampaignAdInput),
      ...adPlacementCampaignAd,
    },
  });

  const handleSuccess = (data: AdPlacementCampaignAdData) => {
    toast({
      title: 'Success',
      description: adPlacementCampaignAd
        ? 'AdPlacementCampaignAd saved'
        : 'AdPlacementCampaignAd created',
      variant: 'success',
    });
    utils.adPlacementCampaignAd.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.adPlacementCampaignAd.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.adPlacementCampaignAd.update.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: AdPlacementCampaignAdInput) => {
    console.log(data);
    if (adPlacementCampaignAd?.id) {
      // update
      update({
        id: adPlacementCampaignAd.id,
        ...data,
      });
    } else {
      create(data);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-wrap gap-4">
          <FormInput
            className="min-w-72 flex-auto"
            label="Name"
            control={form.control}
            name="name"
          />
        </div>

        <div className="flex justify-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
