"use client";

import { trpc } from "@/utils/trpc";
import {
  type CompanyContactData,
  CompanyContactInput,
  getSchemaDefaults,
} from "@repo/common-types";
import {
  Form,
  FormInput,
  zodResolver,
} from "@repo/design-system/components/inputs";
import { Button } from "@repo/design-system/components/ui/button";
import { useToast } from "@repo/design-system/hooks/use-toast";
import type React from "react";
import { useForm } from "react-hook-form";

type CompanyContactFormProps = {
  onSuccess: (value: CompanyContactData) => void;
  companyContact?: CompanyContactData;
  companyId: string;
};

export const CompanyContactForm: React.FC<CompanyContactFormProps> = ({
  companyContact,
  companyId,
  onSuccess,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<CompanyContactInput>({
    resolver: zodResolver(CompanyContactInput),
    defaultValues: {
      ...getSchemaDefaults(CompanyContactInput),
      companyId,
      ...companyContact,
    },
  });
  const handleSuccess = (data: CompanyContactData) => {
    toast({
      title: "Success",
      description: companyContact
        ? "Contact saved"
        : "Contact created",
      variant: "success",
    });
    utils.companyContact.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.companyContact.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.companyContact.update.useMutation({
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
            required
          />
          <FormInput
            className="min-w-72 flex-auto"
            label="Email"
            control={form.control}
            name="email"
          />

          <FormInput
            className="min-w-72 flex-auto"
            label="Phone"
            control={form.control}
            name="phone"
          />
          <FormInput
            className="min-w-72 flex-auto"
            label="Title"
            control={form.control}
            name="title"
          />
          <FormInput
            className="min-w-72 flex-auto"
            label="Department"
            control={form.control}
            name="department"
          />
        </div>
        <FormInput
          type="textarea"
          label="Notes"
          control={form.control}
          name="notes"
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
