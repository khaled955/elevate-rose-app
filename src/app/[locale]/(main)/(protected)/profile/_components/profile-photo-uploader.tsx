"use client";

import * as React from "react";
import Image from "next/image";
import defaultUser from "../../../../../../../public/assets/Images/default_user.jpg";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Trash2, Upload, ImageUp, Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  usePhotoSchema,
  type PhotoFields,
} from "@/lib/schemas/auth-schema/photo.schema";
import { useUpdateProfilePhoto } from "../_hooks/use-update-profile-photo";
import { useTranslations } from "next-intl";

type Props = {
  defaultPhoto?: string | null; // session.user.photo
  className?: string;
};

export default function ProfilePhotoUploader({
  defaultPhoto,
  className,
}: Props) {
  // Translations
  const t = useTranslations();

  // Refs
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Upload hook
  const { mutate: uploadPhoto, isPending } = useUpdateProfilePhoto();

  // RHF (photo is File)
  const {
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<PhotoFields>({
    mode: "onChange",
    resolver: zodResolver(usePhotoSchema()),
    defaultValues: {
      photo: undefined, // ✅ File | undefined
    },
  });

  const pickedFile = watch("photo"); // File | undefined

  // Preview
  const [preview, setPreview] = React.useState<string>(() => {
    return defaultPhoto?.trim()
      ? defaultPhoto
      : (defaultUser as unknown as string);
  });

  // Sync preview with session photo (only when no picked file)
  React.useEffect(() => {
    if (pickedFile) return;
    setPreview(
      defaultPhoto?.trim() ? defaultPhoto : (defaultUser as unknown as string),
    );
  }, [defaultPhoto, pickedFile]);

  // Preview picked file
  React.useEffect(() => {
    if (!pickedFile) return;
    const url = URL.createObjectURL(pickedFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [pickedFile]);

  // Functions
  function openPicker() {
    inputRef.current?.click();
  }

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ set File (not FileList)
    setValue("photo", file, { shouldDirty: true, shouldValidate: true });
    await trigger("photo");
  }

  function resetPhoto() {
    // ✅ File schema => reset to undefined (not null)
    reset({ photo: undefined });

    if (inputRef.current) inputRef.current.value = "";

    setPreview(
      defaultPhoto?.trim() ? defaultPhoto : (defaultUser as unknown as string),
    );
  }

  function handleUpload() {
    if (!pickedFile) return;
    uploadPhoto(pickedFile);
  }

  const isUploadDisabled = isPending || !pickedFile || !!errors.photo;

  return (
    <div
      className={cn(
        "relative flex flex-col items-start gap-4 rounded-xl border border-zinc-50 p-4 shadow-sm",
        "md:flex-row md:items-center md:gap-5",
        className,
      )}
    >
      {/* image centered on small screens */}
      <div className="flex w-full justify-center md:w-auto md:justify-start">
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            alt="user-photo"
            fill
            sizes="88px"
            src={preview}
            className="object-cover"
          />
        </div>
      </div>

      <div className="min-w-0 flex-1 text-center md:text-start">
        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
          {t("upload-photo")}
        </p>

        <p className="mt-1 text-sm leading-5 text-zinc-500 dark:text-zinc-300">
          {t("you-can-upload-a-jpg-png-gif-or-webp-photo-with-max-size-of-5mb")}
        </p>

        {/* validation-error */}
        {errors.photo?.message && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.photo.message}
          </p>
        )}

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            onChange={onPickFile}
            className="sr-only"
            aria-label="Choose profile photo"
          />

          <Button
            type="button"
            variant="outline"
            onClick={openPicker}
            disabled={isPending}
            className={cn(
              "w-full rounded-lg sm:w-auto",
              "border-zinc-200 bg-white hover:bg-zinc-50",
              "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
            )}
          >
            <Upload className="me-2 h-4 w-4" />
            {t("choose-photo")}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={resetPhoto}
            disabled={isPending || (!isDirty && !pickedFile)}
            className="w-full rounded-lg text-zinc-600 hover:bg-zinc-100 sm:w-auto dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <Trash2 className="me-2 h-4 w-4" />
            {t("reset-0")}
          </Button>

          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploadDisabled}
            className="w-full rounded-lg sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader className="me-2 h-4 w-4 animate-spin" />
                {t("uploading")}
              </>
            ) : (
              <>
                <ImageUp className="me-2 h-4 w-4" />
                {t("upload-photo-0")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
