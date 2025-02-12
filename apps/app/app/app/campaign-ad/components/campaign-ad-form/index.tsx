'use client';

import { trpc } from '@/utils/trpc';
import {
  type CampaignAdData,
  CampaignAdInput,
  getSchemaDefaults,
} from '@repo/common-types';
import {
  CheckboxInput,
  Form,
  FormInput,
  zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import type { CampaignAdTypes } from '../campaign-ad-types';

type CampaignAdFormProps = CampaignAdTypes & {
  onSuccess: (value: CampaignAdData) => void;
  campaignAd?: CampaignAdData;
};

export const CampaignAdForm: React.FC<CampaignAdFormProps> = ({
  campaignAd,
  onSuccess,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<CampaignAdInput>({
    resolver: zodResolver(CampaignAdInput),
    defaultValues: {
      ...getSchemaDefaults(CampaignAdInput),
      ...campaignAd,
    },
  });

  const handleSuccess = (data: CampaignAdData) => {
    toast({
      title: 'Success',
      description: campaignAd ? 'CampaignAd saved' : 'CampaignAd created',
      variant: 'success',
    });
    utils.campaignAd.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.campaignAd.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.campaignAd.update.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: CampaignAdInput) => {
    console.log(data);
    if (campaignAd?.id) {
      // update
      update({
        id: campaignAd.id,
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
            label="Weight"
            control={form.control}
            name="weight"
          />
          <CheckboxInput
            className="min-w-72 flex-auto"
            label="Active"
            control={form.control}
            name="isActive"
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
