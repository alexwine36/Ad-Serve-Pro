'use client';

import { trpc } from '@/utils/trpc';
import {
  type AdPlacementData,
  AdPlacementInput,
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
import type { AdPlacementTypes } from '../ad-placement-types';

type AdPlacementFormProps = AdPlacementTypes & {
  onSuccess: (value: AdPlacementData) => void;
  adPlacement?: AdPlacementData;
};

export const AdPlacementForm: React.FC<AdPlacementFormProps> = ({
  adPlacement,
  onSuccess,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<AdPlacementInput>({
    resolver: zodResolver(AdPlacementInput),
    defaultValues: {
      ...getSchemaDefaults(AdPlacementInput),
      ...adPlacement,
    },
  });

  const handleSuccess = (data: AdPlacementData) => {
    toast({
      title: 'Success',
      description: adPlacement ? 'AdPlacement saved' : 'AdPlacement created',
      variant: 'success',
    });
    utils.adPlacement.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.adPlacement.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.adPlacement.update.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: AdPlacementInput) => {
    console.log(data);
    if (adPlacement?.id) {
      // update
      update({
        id: adPlacement.id,
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
        <FormInput
          label="Description"
          type="textarea"
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
