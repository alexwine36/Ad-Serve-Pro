'use client';

import { trpc } from '@/utils/trpc';
import { type MemberData, MemberInput } from '@repo/common-types';
import { MemberRole } from '@repo/database';
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

type MemberFormProps = {
  onSuccess: (value: MemberData) => void;
  member?: MemberData;
};

export const MemberForm: React.FC<MemberFormProps> = ({
  member,
  onSuccess,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<MemberInput>({
    resolver: zodResolver(MemberInput),
    defaultValues: {
      prevEmail: member?.email || '',
      title: '',
      email: '',
      active: true,
      role: MemberRole.MEMBER,
      description: '',
      ...member,
    },
  });

  const handleSuccess = (data: MemberData) => {
    toast({
      title: 'Success',
      description: member ? 'Member saved' : 'Member created',
      variant: 'success',
    });
    utils.member.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.member.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.member.update.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: MemberInput) => {
    console.log(data);
    if (member) {
      // update
      update({
        // prevEmail: member.email,
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
            label="Email"
            control={form.control}
            name="email"
            disabled={!!member}
          />
          <FormInput
            className="min-w-72 flex-auto"
            label="Title"
            control={form.control}
            name="title"
          />
          <SelectInput
            className="min-w-72 flex-auto"
            label="Role"
            control={form.control}
            name="role"
            options={Object.values(MemberRole).map((role) => ({
              value: role,
              label: pipe(role, toLowerCase(), capitalize()),
            }))}
          />
          <CheckboxInput
            className="min-w-72 flex-auto"
            label="Active"
            control={form.control}
            name="active"
          />
          {/* <FormInput
            className="min-w-72 flex-auto"
            label="Image"
            control={form.control}
            name="image"

          /> */}
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
