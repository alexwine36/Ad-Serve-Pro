'use client';

import { trpc } from '@/utils/trpc';
import {
  ADVERTISEMENT_SIZES,
  type AdvertisementData,
  AdvertisementInput,
  getSchemaDefaults,
} from '@repo/common-types';
import { AdType } from '@repo/database';
import {
  CheckboxInput,
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
import type { AdvertisementTypes } from '../advertisement-types';

type AdvertisementFormProps = AdvertisementTypes & {
  onSuccess: (value: AdvertisementData) => void;
  advertisement?: AdvertisementData;
};

export const AdvertisementForm: React.FC<AdvertisementFormProps> = ({
  advertisement,
  onSuccess,
  companyId,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<AdvertisementInput>({
    resolver: zodResolver(AdvertisementInput),
    defaultValues: {
      ...getSchemaDefaults(AdvertisementInput),
      companyId,
      ...advertisement,
    },
  });

  const handleSuccess = (data: AdvertisementData) => {
    toast({
      title: 'Success',
      description: advertisement
        ? 'Advertisement saved'
        : 'Advertisement created',
      variant: 'success',
    });
    utils.advertisement.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.advertisement.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.advertisement.update.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: AdvertisementInput) => {
    console.log(data);
    if (advertisement?.id) {
      // update
      update({
        id: advertisement.id,
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
            label="Content"
            control={form.control}
            name="content"
          />

          <SelectInput
            className="min-w-72 flex-auto"
            label="Type"
            control={form.control}
            name="type"
            options={Object.values(AdType).map((status) => ({
              value: status,
              label: pipe(status, toLowerCase(), capitalize()),
            }))}
          />

          <SelectInput
            className="min-w-72 flex-auto"
            label="Size"
            control={form.control}
            name="metadata.size"
            options={Object.entries(ADVERTISEMENT_SIZES).map(([val, size]) => ({
              label: size.name,
              value: val,
            }))}
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
