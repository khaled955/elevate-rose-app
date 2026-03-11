import { useTranslations } from "next-intl";

export function useValidateCartInput() {
  // Translations
  const t = useTranslations();

  // Validation function
  function validate(next: string, productQuantity: number): string | null {
    if (next.trim() === "") return null;

    const v = Number(next);

    if (Number.isNaN(v)) {
      return t("validation.invalid_number");
    }

    if (!Number.isInteger(v)) {
      return t("validation.no_fraction");
    }

    if (v <= 0) {
      return t('validation-must_be_positive');
    }

    if (v > productQuantity) {
      return t("validation.stock_available", { quantity: productQuantity });
    }

    return null;
  }

  return validate;
}
