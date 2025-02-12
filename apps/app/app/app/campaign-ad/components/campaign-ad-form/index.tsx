'use client';

import { trpc } from '@/utils/trpc';
import {
type CampaignAdData,
CampaignAdInput,
getSchemaDefaults,
} from '@repo/common-types';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import {
Form,
FormInput,
zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { CampaignAdTypes } from '../campaign-ad-types';


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
          <FormInput className="min-w-72 flex-auto" label="Name" control={form.control} name="name" />
          <FormInput className="min-w-72 flex-auto" label="Slug" control={form.control} name="slug" prefix={'/'} />
          <FormInput className="min-w-72 flex-auto" label="Website" control={form.control} name="website" />
          <FormInput className="min-w-72 flex-auto" label="Image" control={form.control} name="image" />
        </div>
        <FormInput type="textarea" label="Description" control={form.control} name="description" />
        <div className="flex justify-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
    );
    };