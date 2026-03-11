import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import {
  AddressFormFields,
  useAdressSchema,
} from "@/lib/schemas/address-schema/address.schema";
import { Address, AddressDraft } from "@/lib/types/addresses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type AddressFormProps = {
  handleShowMap: () => void;
  setFullAddress: React.Dispatch<React.SetStateAction<AddressDraft | null>>;
  currentAddress: Address | null;
};

export default function AddressForm({
  handleShowMap,
  setFullAddress,
  currentAddress,
}: AddressFormProps) {
  // Translations
  const t = useTranslations();
  // RHF
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isValid, errors },
    control,
  } = useForm<AddressFormFields>({
    mode: "onChange",
    defaultValues: {
      city: currentAddress?.city || "",
      phone: currentAddress?.phone || "",
      street: currentAddress?.street || "",
    },
    resolver: zodResolver(useAdressSchema()),
  });

  const handleSetAddress: SubmitHandler<AddressFormFields> = (values) => {
    // set state
    setFullAddress({
      ...values,
      lat: "",
      long: "",
      username: "",
    });

    // show map
    handleShowMap();
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(handleSetAddress)}>
        {/* city */}
        <div className="city">
          <Label>{t('city')}</Label>
          <Input
            {...register("city")}
            type="text"
            placeholder={t('enter-city-name')}
          />
          {/* feedback */}
          {errors.city && <FeedbackError errorMsg={errors.city.message} />}
        </div>
        {/* address */}
        <div className="address">
          <Label>{t('address')}</Label>
          <Textarea
            {...register("street")}
            placeholder={t('enter-your-full-address')}
          />
          {/* feedback */}
          {errors.street && <FeedbackError errorMsg={errors.street.message} />}
        </div>

        {/* Phone */}
        <div className="phone">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                placeholder={t("enter-your-phone")}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                id="phone"
                defaultCountry="EG"
              />
            )}
          />

          {/* feedback */}
          {errors.phone && <FeedbackError errorMsg={errors.phone.message} />}
        </div>

        {/*submit-button */}
        <Button
          disabled={isSubmitted && !isValid}
          type="submit"
          className="my-3 w-full"
        >
          {t("next")}
        </Button>
      </form>
    </div>
  );
}
