import { useTranslations } from "next-intl";
import z from "zod";

const GENERAL_PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export function useAdressSchema() {
// Translations
const t = useTranslations()
  return z.object({
    street: z.string().nonempty(t('address-is-required')),
    city: z.string().nonempty(t('city-is-required')),
    phone: z.string().nonempty(t('phone-is-required-0')).regex(GENERAL_PHONE_REGEX,t('phone-is-invalid')),
  });
}

export type AddressFormFields = z.infer<ReturnType<typeof useAdressSchema>>;
