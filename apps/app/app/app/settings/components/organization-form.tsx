'use client';

import { OrganizationInput } from '@repo/common-types';
import {
  Form,
  FormInput,
  zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../../utils/trpc';
type OrganizationFormProps = {
  organization?: OrganizationInput;
};

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  organization,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();
  const form = useForm<OrganizationInput>({
    resolver: zodResolver(OrganizationInput),
    defaultValues: {
      description: '',
      name: '',
      slug: '',
      website: undefined,
      image: undefined,
      ...organization,
    },
  });

  const handleSuccess = () => {
    toast({
      title: 'Organization saved',
      // description: 'Organization saved',
      variant: 'success',
    });
    utils.organization.invalidate();
  };

  const { mutate: createOrg } = trpc.organization.create.useMutation({
    onSuccess: () => {
      handleSuccess();
    },
  });
  const { mutate: updateOrg } = trpc.organization.update.useMutation({
    onSuccess: () => {
      handleSuccess();
    },
  });

  const onSubmit = (data: OrganizationInput) => {
    //   const resp = createOrg({ organization: data });
    if (organization?.id) {
      updateOrg({
        id: organization.id,
        ...data,
      });
    } else {
      createOrg(data);
    }
    console.log(data);
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
            // className="flex-1"
            className="min-w-72 flex-auto"
            label="Image"
            control={form.control}
            name="image"
            //   prefix={'/'}
          />
          <FormInput
            // className="flex-1"
            className="min-w-72 flex-auto"
            label="Website"
            control={form.control}
            name="website"
            //   prefix={'/'}
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
