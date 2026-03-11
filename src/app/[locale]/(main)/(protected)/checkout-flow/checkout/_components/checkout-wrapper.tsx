"use client";

import { Stepper } from "@/components/shared/stepper";
import { useState } from "react";
import AddressStepOne from "./address-step-one";
import PaymentStepTwo from "./payment-step-two";
import { AddressModal } from "@/components/features/adress-modal/adress-modal";
import cash from "../../../../../../../../public/assets/Images/Cash-on-Delivery.png";
import credit from "../../../../../../../../public/assets/Images/Credit-Card.png";
import { useLocale } from "next-intl";
import { useCashOrder } from "../_hooks/use-cash-order";
import { CheckOutAddress } from "@/lib/types/checkout";
import { useCreditOrder } from "../_hooks/use-credite-order";

export default function CheckoutWrapper() {
  // Translations
  const locale = useLocale();
  // States
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useState<"cash" | "credit" | null>(null);
  const [currentAdress, setCurrentAddress] = useState<CheckOutAddress | null>(
    null,
  );

  // Mutations
  const { cashIsPending, onCreateCashOrder } = useCashOrder();
  const { onCreateCreditOrder, creditIsPending } = useCreditOrder();
  // Functions
  function handleIncreaseStep() {
    setStep((current) => current + 1);
  }

  function handleResetSteps() {
    setStep(1);
  }

  function handleToggleAddressModel() {
    setShowModal((current) => !current);
  }

  function handleCheckOutPayment() {
    // cash order
    if (method === "cash" && currentAdress) onCreateCashOrder(currentAdress);
    // credite
    if (method === "credit" && currentAdress)
      onCreateCreditOrder({
        fieldValues: currentAdress,
        // current url
        url: window.location.origin,
      });
  }

  return (
    <section>
      <header>
        {/* stepper */}
        <Stepper currentStep={step} steps={2} />
      </header>
      <main>
        {step === 1 && (
          <AddressStepOne
            handleToggleAddressModel={handleToggleAddressModel}
            handleIncreaseStep={handleIncreaseStep}
            setCurrentAddress={setCurrentAddress}
          />
        )}
        {step === 2 && (
          <PaymentStepTwo
            handleResetSteps={handleResetSteps}
            cashImageSrc={cash}
            creditImageSrc={credit}
            locale={locale}
            onChange={setMethod}
            value={method}
            onCheckout={handleCheckOutPayment}
            isLoading={cashIsPending || creditIsPending}
          />
        )}
      </main>

      {/* adress-modal */}
      {showModal && (
        <AddressModal onOpenChange={setShowModal} open={showModal} />
      )}
    </section>
  );
}
