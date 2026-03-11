"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/shared/stepper";
import AddressForm from "./address-form";
import AddressMap from "./address-map";
import AddressListModal from "./address-list-modal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Address, AddressFields } from "@/lib/types/addresses";
import DeleteAlert from "@/components/shared/alert-dialog";
import { useDeleteAddress } from "@/hooks/address/use-delete-address";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

type AddressModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormStepTitle = "create" | "update";

export function AddressModal({ onOpenChange, open }: AddressModalProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  // States
  const [step, setStep] = useState(1);
  const [formSteps, setFormSteps] = useState(1);
  const [formTitle, setFormTitle] = useState<FormStepTitle>("create");
  const [fullAdress, setFullAdress] = useState<null | AddressFields>(null);
  const [currentAddress, setCurrentAddress] = useState<null | Address>();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<null | string>(null);

  // Hooks
  const queryClient = useQueryClient();

  // Mutations
  const { deleteAddressisPending, onDeleteAddress } = useDeleteAddress();

  // Functions
  function handleShowFormSteps() {
    setStep(2);
    setFormSteps(1);
  }

  function handleShowMap() {
    setFormSteps(2);
  }

  function handleUpdate(address: Address) {
    setFormTitle("update");
    handleShowFormSteps();
    setCurrentAddress(address);
  }

  function handleDelete(id: string) {
    setOpenDeleteAlert(true);
    setSelectedId(id);
  }

  function handleDeleteCurrentAddress() {
    // Guard-class
    if (!selectedId) return;
    onDeleteAddress(selectedId, {
      onSuccess: () => {
        toast.success(t("address-deleted-successfully"), {
          duration: 600,
          onAutoClose: async () => {
            //revalidate address fetch
            await queryClient.invalidateQueries({ queryKey: ["address"] });
            // close delete modal
            onOpenChange(false);
          },
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  return (
    <>
      <Dialog defaultOpen={open} onOpenChange={onOpenChange}>
        <DialogContent className="z-[9999]">
          <DialogHeader>
            <DialogTitle>
              {/*first-step-title-default */}
              {step === 1 && (
                <header className="flex justify-between items-center mb-4">
                  <h1 className="capitalize text-zinc-800 dark:text-zinc-200 font-bold text-3xl">
                    {t("my-addresses")}
                  </h1>
                  <Button onClick={handleShowFormSteps} variant={"secondary"}>
                    {t("add-a-new-address")}
                  </Button>
                </header>
              )}
            </DialogTitle>

            {/* form-add-update-title */}
            {step === 2 && formSteps === 1 && (
              <header className="mb-4 border-b border-zinc-200">
                <h1 className="capitalize text-zinc-800 dark:text-zinc-200 font-bold text-3xl mb-3">
                  {formTitle === "create" && t("add-a-new-address-0")}
                  {formTitle === "update" && t("update-address-info")}
                </h1>

                {/* stepper */}
                <Stepper currentStep={formSteps} steps={2} />
                <p className="text-maroon-600 text-2xl">
                  {t("enter-address-details")}
                </p>
              </header>
            )}

            {/* map-title */}
            {step === 2 && formSteps === 2 && (
              <header className="mb-4 border-b border-zinc-200 pb-3">
                <h1 className="capitalize text-zinc-800 dark:text-zinc-200 font-bold text-3xl mb-3">
                  {t("add-a-new-address-1")}
                </h1>

                {/* stepper */}
                <Stepper currentStep={formSteps} steps={2} />
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleShowFormSteps}
                    className=" rounded-full size-12"
                  >
                    {locale === "ar" ? <ArrowRight /> : <ArrowLeft />}
                  </Button>
                  <p className="text-maroon-600 text-2xl">
                    {t("find-your-location")}
                  </p>
                </div>
              </header>
            )}

            <DialogDescription>
              {/* address-list-first-step */}
              {step === 1 && (
                <AddressListModal
                  handleUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              )}

              {/* address-form */}
              {step === 2 && formSteps === 1 && (
                <AddressForm
                  setFullAddress={setFullAdress}
                  handleShowMap={handleShowMap}
                  currentAddress={currentAddress!}
                />
              )}
              {/* map */}
              {step === 2 && formSteps === 2 && (
                <AddressMap
                  closeModal={onOpenChange}
                  setFullAddress={setFullAdress}
                  fullAdress={fullAdress}
                  formTitle={formTitle}
                  currentAdress={currentAddress!}
                />
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* delete-alert */}
      <DeleteAlert
        onConfirm={handleDeleteCurrentAddress}
        isLoading={deleteAddressisPending}
        open={openDeleteAlert}
        onOpenChange={setOpenDeleteAlert}
        locale={locale}
      />
    </>
  );
}
