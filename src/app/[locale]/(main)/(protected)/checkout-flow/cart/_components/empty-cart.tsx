import Image from "next/image";
import emptyPhoto from "../../../../../../../../public/assets/Images/empty-cart.png";
import { useTranslations } from "next-intl";
export default function EmptyCart() {
  // Translations
  const t = useTranslations()
  return (
    <div className="flex flex-col gap-6 items-center border border-zinc-200 rounded-md py-5 my-5 px-2 ">
      <div className="img relative">
        <Image src={emptyPhoto} alt="emty-cart" width={250} height={0} />
      </div>
      <p className="text-zinc-400 text-lg">{t('your-cart-is-empty-wanna-try-shopping')}</p>
    </div>
  );
}
