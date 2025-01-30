'use client';

import { trpc } from '@/utils/trpc';
import {
  type CompanyContactData,
  CompanyContactInput,
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



type CompanyContactFormProps = {
  onSuccess: (value: CompanyContactData) => void;
  companyContact?: CompanyContactData;
};

export const CompanyContactForm: React.FC<CompanyContactFormProps> = ({
  companyContact,
  onSuccess,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<CompanyContactInput>({
    resolver: zodResolver(CompanyContactInput),
    defaultValues: {
      ...companyContact,
    },
  });

  const handleSuccess = (data: CompanyContactData) => {
    toast({
      title: 'Success',
      description: companyContact ? 'CompanyContact saved' : 'CompanyContact created',
      variant: 'success',
    });
    utils.companyContact.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.companyContact.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.companyContact.edit.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: CompanyContactInput) => {
    console.log(data);
    if (companyContact?.id) {
      // update
      update({
        id: companyContact.id,
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
