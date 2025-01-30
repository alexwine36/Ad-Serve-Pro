'use client';

import { trpc } from '@/utils/trpc';
import {
  type CampaignData,
  CampaignInput,
  getSchemaDefaults,
} from '@repo/common-types';
import {
  DateInput,
  Form,
  FormInput,
  SelectInput,
  zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { capitalize, pipe, toLowerCase } from 'remeda';
import { CampaignStatus } from '../../../../../../../packages/database';
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
      ...getSchemaDefaults(CampaignInput),
      companyId,
      ...campaign,
    },
  });

  const startDate = form.watch('startDate');
  const endDate = form.watch('endDate');

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
            label="Budget"
            control={form.control}
            name="budget"
          />
          <SelectInput
            className="min-w-72 flex-auto"
            label="Status"
            control={form.control}
            name="status"
            options={Object.values(CampaignStatus).map((status) => ({
              value: status,
              label: pipe(status, toLowerCase(), capitalize()),
            }))}
          />
        </div>

        <div className="flex w-full flex-wrap gap-4">
          <DateInput
            className="min-w-72 flex-auto"
            label="Start Date"
            control={form.control}
            name="startDate"
            disabledAfter={endDate}
          />

          <DateInput
            disabledBefore={startDate}
            className="min-w-72 flex-auto"
            label="End Date"
            control={form.control}
            name="endDate"
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
