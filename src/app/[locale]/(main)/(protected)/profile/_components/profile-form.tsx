"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ProfileFields,
  useProfileSchema,
} from "@/lib/schemas/auth-schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FeedbackError from "@/components/shared/feedback-error";
import { useUpdateProfile } from "../_hooks/use-update-profile";
import { toast } from "sonner";
import ProfilePhotoUploader from "./profile-photo-uploader";
import { useLocale, useTranslations } from "next-intl";
import DeleteAlert from "@/components/shared/alert-dialog";
import { useDeleteProfile } from "../_hooks/use-delete-profile";
import { signOut } from "next-auth/react";

export default function ProfileForm() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mutation
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

  // Handlers:=> Update
  const handleUpdateProfile: SubmitHandler<ProfileFields> = (values) => {
    if (!isDirty) {
      toast.warning(t("no-changes-to-update"));
      return;
    }
    // update profile action
    onUpdateProfile(values);
  };

  // =>Delete
  const handleDeleteProfile = () => {
    onDelete(undefined, {
      onSuccess: () => {
        toast.success(t("profile-deleted-successfully"), {
          duration: 3000,
          onAutoClose: async () => {
            // Remove Token  from Cookies
            await signOut({ redirect: false });
            // Redirect to home page after deletion
            window.location.href = `/${locale}`;
          },
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSettled: () => {
        // Close the modal after the action is settled (either success or error)
        setShowDeleteModal(false);
      },
    });
  };

  // =>show-modal
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // Effects
  useEffect(() => {
    //Guard Clause
    if (!currentUser) return;

    //^==========> Fill with data from session on first load
    reset({
      email: currentUser?.email || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      gender: currentUser?.gender || "",
      phone: currentUser?.phone || "",
    });
  }, [currentUser, reset]);

  return (
    <div
      className={
        "col-span-1 my-4 flex flex-col items-center gap-6 rounded-md p-4 shadow-sm lg:col-span-9 lg:p-6 "
      }
    >
      {/* Photo */}
      <ProfilePhotoUploader defaultPhoto={currentUser?.photo || null} />

      {status === "loading" ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="w-full max-w-3xl">
          <form
            className="space-y-3"
            onSubmit={handleSubmit(handleUpdateProfile)}
          >
            {/* first & last name */}
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="grow">
                <Label htmlFor="first-name">{t("first-name")}</Label>
                {/* first-name */}
                <Input {...register("firstName")} type="text" id="first-name" />
                {/* validation feedback */}
                {errors.firstName && (
                  <FeedbackError errorMsg={errors.firstName.message} />
                )}
              </div>

              <div className="grow">
                {/* last-name */}
                <Label htmlFor="last-name">{t("last-name")}</Label>
                <Input {...register("lastName")} type="text" id="last-name" />
                {/* validation feedback */}
                {errors.lastName && (
                  <FeedbackError errorMsg={errors.lastName.message} />
                )}
              </div>
            </div>

            {/* email */}
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input {...register("email")} type="email" id="email" />
              {/* validation feedback */}
              {errors.email && (
                <FeedbackError errorMsg={errors.email.message} />
              )}
            </div>

            {/* phone */}
            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput id="phone" defaultCountry={"EG"} {...field} />
                )}
              />
              {/* validation feedback */}
              {errors.phone && (
                <FeedbackError errorMsg={errors.phone.message} />
              )}
            </div>

            {/* gender */}
            <div>
              <Label htmlFor="gender">{t("gender")}</Label>
              <Input {...register("gender")} type="text" id="gender" disabled />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              {/* delete-button */}
              <button
                onClick={handleShowDeleteModal}
                className="text-maroon-500"
                type="button"
              >
                {t("delete-my-account")}
              </button>

              {/* submit-button */}
              <Button
                disabled={updatePending || (isSubmitted && !isValid)}
                type="submit"
                className="w-full sm:w-auto"
              >
                {updatePending ? t("updating") : t("update-profile")}
              </Button>
            </div>

            {/* server-error */}
            {updateError && <FeedbackError errorMsg={updateError.message} />}
            {deleteError && <FeedbackError errorMsg={deleteError.message} />}
          </form>
        </div>
      )}

      {/* Delete-modal */}
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
