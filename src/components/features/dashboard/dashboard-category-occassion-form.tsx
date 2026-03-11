"use client";
import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateFormField,
  UpdateFormField,
  useCreateSchema,
  useUpdateSchema,
} from "@/lib/schemas/dashboard-schema/shared.schema";
import { cn } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

// Types

type CreateMode = {
  mode: "create";
  currentImageUrl?: never;
  defaultName?: never;
};

type UpdateMode = {
  mode: "update";
  currentImageUrl?: string;
  defaultName?: string;
};

type DashboardCategoryOccassionFormProps = (CreateMode | UpdateMode) & {
  submitText: string;
  isLoading?: boolean;
  className?: string;
  serverError?: string | null;
  formType: "category" | "occassion";
  onSubmit: (formData: FormData, reset: () => void) => void;
};

type CreateFormProps = {
  submitText: string;
  isLoading?: boolean;
  className?: string;
  serverError?: string | null;
  formType: "category" | "occassion";
  onSubmit: (formData: FormData, reset: () => void) => void;
};

type UpdateFormProps = CreateFormProps & {
  defaultName?: string;
  currentImageUrl?: string;
};

// Create Form
function CreateForm({
  submitText,
  isLoading,
  className,
  serverError,
  formType,
  onSubmit,
}: CreateFormProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const schema = useCreateSchema();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<CreateFormField>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "" },
  });

  const onFormSubmit: SubmitHandler<CreateFormField> = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image) formData.append("image", values.image);

    onSubmit(formData, () => {
      reset({ name: "" });
      // reset-file-input
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={cn("space-y-4 md:w-[75%]", className)}
    >
      {/* Name */}
      <div className="space-y-1">
        <Label className="relative before:absolute before:top-0 before:-end-2 before:text-red-600 before:content-['*']">
          {t("name")}
        </Label>
        <Input
          {...register("name")}
          placeholder={
            formType === "category"
              ? t("enter-category-name-0")
              : t("enter-occassion-name")
          }
        />
        {errors.name && <FeedbackError errorMsg={errors.name.message} />}
      </div>

      {/* Image */}
      <div className="space-y-1">
        <Label className="relative before:absolute before:top-0 before:-end-2 before:text-red-600 before:content-['*']">
          {formType === "category"
            ? t("category-image-0")
            : t("occassion-image")}
        </Label>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) =>
            setValue("image", e.target.files?.[0], {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
        {errors.image && <FeedbackError errorMsg={errors.image.message} />}
      </div>

      {/* Server-Error */}
      {serverError && <FeedbackError errorMsg={serverError} />}

      <Button
        className="w-full"
        disabled={(isSubmitted && !isValid) || isLoading}
        type="submit"
      >
        {isLoading ? t("loading") : submitText}
      </Button>
    </form>
  );
}

// Update Form

function UpdateForm({
  submitText,
  isLoading,
  className,
  serverError,
  formType,
  onSubmit,
  defaultName,
  currentImageUrl,
}: UpdateFormProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const schema = useUpdateSchema();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid, isDirty },
  } = useForm<UpdateFormField>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: defaultName ?? "" },
  });

  const onFormSubmit: SubmitHandler<UpdateFormField> = (values) => {
    // guard-no-changes
    if (!isDirty) {
      toast.info(t("no-changes"));
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    onSubmit(formData, () => reset({ name: defaultName ?? "" }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn("space-y-4 md:w-[75%]", className)}
      >
        {/* Name */}
        <div className="space-y-1">
          <Label className="relative before:absolute before:top-0 before:-end-2 before:text-red-600 before:content-['*']">
            {t("name")}
          </Label>
          <Input
            {...register("name")}
            placeholder={
              formType === "category"
                ? t("enter-category-name-0")
                : t("enter-occassion-name")
            }
          />
          {errors.name && <FeedbackError errorMsg={errors.name.message} />}
        </div>

        {/* Image — gallery button */}
        {currentImageUrl && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {/* Image Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="text-sm font-medium">
                {formType === "category"
                  ? t("view-category-image")
                  : t("view-occassion-image")}
              </span>
            </button>
          </div>
        )}

        {/* Server-Error */}
        {serverError && <FeedbackError errorMsg={serverError} />}

        <Button
          className="w-full"
          disabled={(isSubmitted && !isValid) || isLoading}
          type="submit"
        >
          {isLoading ? t("loading") : submitText}
        </Button>
      </form>

      {/* Gallery Modal */}
      {isGalleryOpen && currentImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-3 end-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Title */}
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              {formType === "category"
                ? t("category-image-0")
                : t("occassion-image")}
            </p>

            {/* Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src={currentImageUrl}
                alt={t("image")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Main Export
export default function DashboardCategoryOccassionForm(
  props: DashboardCategoryOccassionFormProps,
) {
  if (props.mode === "update") {
    return (
      <UpdateForm
        submitText={props.submitText}
        isLoading={props.isLoading}
        className={props.className}
        serverError={props.serverError}
        formType={props.formType}
        onSubmit={props.onSubmit}
        defaultName={props.defaultName}
        currentImageUrl={props.currentImageUrl}
      />
    );
  }

  return (
    <CreateForm
      submitText={props.submitText}
      isLoading={props.isLoading}
      className={props.className}
      serverError={props.serverError}
      formType={props.formType}
      onSubmit={props.onSubmit}
    />
  );
}
