import Image from "next/image";
import photo from "../../../public/assets/Images/app-logo.webp";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import SubscriptionForm from "@/components/features/footer/subscription-form";

type NavLinkProps = {
  name: string;
  path: string;
};

export default function MainFooter() {
  const locale = useLocale();
  const t = useTranslations();

  const navLinks: NavLinkProps[] = [
    { name: t("home-0"), path: "/" },
    { name: t("products-0"), path: "/products" },
    { name: t("categories-0"), path: "/categories" },
    { name: t("contact-0"), path: "/contact" },
    { name: t("about-1"), path: "/about" },
  ];

  return (
    <div className="bg-zinc-800 p-10 text-zinc-100 dark:bg-zinc-900 flex flex-col md:flex-row md:justify-between gap-6">
      <section className="photo-links flex gap-3">
        <div className="photo flex flex-col gap-4">
          <Image
            src={photo}
            alt={t("rose-app-logo")}
            width={200}
            height={200}
          />
          <span className="text-lg font-semibold text-soft-pink-300">
            Rose E-Commerce App
          </span>
          <span className="text-sm">{t("all-rights-reserved-or-2026")}</span>
        </div>
        <div>
          <p className="text-lg text-soft-pink-300 mb-3">
            {t("discover-our-website")}
          </p>
          <ul className="section-links space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link locale={locale} href={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="subscribe">
        <div className="mb-4">
          <p className="text-lg text-soft-pink-300">
            {t.rich("discount-percentage", {
              share: 0.2,
              span: (value) => <span className="text-zinc-100">{value}</span>,
            })}
          </p>
          <span className="text-sm">
            {t("by-subscribing-to-our-newsletter")}
          </span>
        </div>

        <SubscriptionForm />
      </section>
    </div>
  );
}
