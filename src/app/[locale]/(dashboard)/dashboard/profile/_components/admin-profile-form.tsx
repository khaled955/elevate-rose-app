"use client";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Loader, User } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import FeedbackError from "@/components/shared/feedback-error";
import DeleteAlert from "@/components/shared/alert-dialog";
import ProfilePhotoUploader from "@/app/[locale]/(main)/(protected)/profile/_components/profile-photo-uploader";

import {
  ProfileFields,
  useProfileSchema,
} from "@/lib/schemas/auth-schema/profile.schema";
import { useUpdateProfile } from "@/app/[locale]/(main)/(protected)/profile/_hooks/use-update-profile";
import { useDeleteProfile } from "@/app/[locale]/(main)/(protected)/profile/_hooks/use-delete-profile";

export default function AdminProfileForm() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mutations
  const {
    error: updateError,
    isPending: updatePending,
    mutate: onUpdateProfile,
    status,
    currentUser,
  } = useUpdateProfile();

  const { deleteError, deleteIsPending, onDelete } = useDeleteProfile();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid, isDirty },
    reset,
    control,
  } = useForm<ProfileFields>({
    mode: "onBlur",
    resolver: zodResolver(useProfileSchema()),
  });

  // Handlers
  const handleUpdateProfile: SubmitHandler<ProfileFields> = (values) => {
    if (!isDirty) {
      toast.warning(t("no-changes-to-update"));
      return;
    }
    onUpdateProfile(values);
  };

  // Handlers: Delete
  const handleDeleteProfile = () => {
    onDelete(undefined, {
      onSuccess: () => {
        toast.success(t("profile-deleted-successfully"), {
          duration: 3000,
          onAutoClose: () => {
            // Remove token from cookies and redirect
            signOut();
          },
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSettled: () => {
        // Close modal after action settles (success or error)
        setShowDeleteModal(false);
      },
    });
  };

  // Effects: pre-fill form from session
  useEffect(() => {
    // Guard clause
    if (!currentUser) return;

    // Fill with data from session on first load
    reset({
      email: currentUser?.email || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      gender: currentUser?.gender || "",
      phone: currentUser?.phone || "",
    });
  }, [currentUser, reset]);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/[0.06] dark:bg-white/[0.03] dark:backdrop-blur-sm p-6 md:p-8">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/15">
          <User size={18} className="text-indigo-600 dark:text-indigo-400" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            {t("my-account")}
          </h2>
          <p className="text-xs text-zinc-500">{t("manage-your-profile")}</p>
        </div>
      </div>

      {/* Loading state */}
      {status === "loading" ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin text-indigo-500 dark:text-indigo-400" />
        </div>
      ) : (
        <>
          {/* Avatar uploader */}
          <div className="mb-8">
            <ProfilePhotoUploader defaultPhoto={currentUser?.photo || null} />
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={handleSubmit(handleUpdateProfile)}
          >
            {/* First & last name */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="grow space-y-1.5">
                <Label
                  htmlFor="first-name"
                  className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {t("first-name")}
                </Label>
                <Input
                  {...register("firstName")}
                  type="text"
                  id="first-name"
                  className="border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-400 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-indigo-500/50"
                />
                {/* Validation feedback */}
                {errors.firstName && (
                  <FeedbackError errorMsg={errors.firstName.message} />
                )}
              </div>

              <div className="grow space-y-1.5">
                <Label
                  htmlFor="last-name"
                  className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {t("last-name")}
                </Label>
                <Input
                  {...register("lastName")}
                  type="text"
                  id="last-name"
                  className="border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-400 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-indigo-500/50"
                />
                {/* Validation feedback */}
                {errors.lastName && (
                  <FeedbackError errorMsg={errors.lastName.message} />
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                {t("email")}
              </Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                className="border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-400 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-indigo-500/50"
              />
              {/* Validation feedback */}
              {errors.email && (
                <FeedbackError errorMsg={errors.email.message} />
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                {t("phone")}
              </Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="phone"
                    defaultCountry={"EG"}
                    {...field}
                    className="border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white"
                  />
                )}
              />
              {/* Validation feedback */}
              {errors.phone && (
                <FeedbackError errorMsg={errors.phone.message} />
              )}
            </div>

            {/* Gender (read-only) */}
            <div className="space-y-1.5">
              <Label
                htmlFor="gender"
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                {t("gender")}
              </Label>
              <Input
                {...register("gender")}
                type="text"
                id="gender"
                disabled
                className="border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-500"
              />
            </div>

            {/* Actions row */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              {/* Delete account */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-sm text-red-500/70 transition-colors hover:text-red-500 dark:text-red-500/70 dark:hover:text-red-400"
                type="button"
              >
                {t("delete-my-account")}
              </button>

              {/* Submit */}
              <Button
                disabled={updatePending || (isSubmitted && !isValid)}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white sm:w-auto"
              >
                {updatePending ? (
                  <Loader className="animate-spin" size={16} />
                ) : (
                  t("update-profile")
                )}
              </Button>
            </div>

            {/* Server errors */}
            {updateError && <FeedbackError errorMsg={updateError.message} />}
            {deleteError && <FeedbackError errorMsg={deleteError.message} />}
          </form>
        </>
      )}

      {/* Delete confirmation modal*/}
      {showDeleteModal && (
        <DeleteAlert
          onConfirm={handleDeleteProfile}
          locale={locale}
          onOpenChange={setShowDeleteModal}
          open={showDeleteModal}
          isLoading={deleteIsPending}
          title={t("are-you-sure-you-want-to-delete-your-profile")}
        />
      )}
    </div>
  );
}
