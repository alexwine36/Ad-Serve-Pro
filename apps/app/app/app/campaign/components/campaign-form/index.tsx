'use client';

import { trpc } from '@/utils/trpc';
import { type CampaignData, CampaignInput } from '@repo/common-types';
import {
  Form,
  FormInput,
  zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import type { CampaignTypes } from '../campaign-types';

type CampaignFormProps = CampaignTypes & {
  onSuccess: (value: CampaignData) => void;
  campaign?: CampaignData;
};

export const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  onSuccess,
  companyId,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<CampaignInput>({
    resolver: zodResolver(CampaignInput),
    defaultValues: {
      companyId,
      ...campaign,
    },
  });

  const handleSuccess = (data: CampaignData) => {
    toast({
      title: 'Success',
      description: campaign ? 'Campaign saved' : 'Campaign created',
      variant: 'success',
    });
    utils.campaign.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.campaign.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.campaign.update.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: CampaignInput) => {
    console.log(data);
    if (campaign?.id) {
      // update
      update({
        id: campaign.id,
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
          <FormInput
            className="min-w-72 flex-auto"
            label="Slug"
            control={form.control}
            name="slug"
            prefix={'/'}
          />
          <FormInput
            className="min-w-72 flex-auto"
            label="Website"
            control={form.control}
            name="website"
          />
          <FormInput
            className="min-w-72 flex-auto"
            label="Image"
            control={form.control}
            name="image"
          />
        </div>
        <FormInput
          type="textarea"
          label="Description"
          control={form.control}
          name="description"
        />
        <div className="flex justify-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
