import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomePartnerCompanies() {
  const t = useTranslations();

  return (
    <div className="mt-11 p-8 rounded-xl bg-maroon-50 dark:bg-zinc-700">
      <header>
        <h2 className="text-center text-4xl font-bold text-maroon-700 dark:text-soft-pink-200">
          {t.rich("companies-trust", {
            count: 4.5,
            span: (value) => (
              <span className="text-soft-pink-500 dark:text-maroon-400">
                {value}
              </span>
            ),
          })}
        </h2>
      </header>

      <footer className="companies-logo mt-5 flex flex-col md:flex-row justify-center items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <Image
            key={index}
            width={146}
            height={51}
            src={`/assets/Images/companie-${index + 1}.png`}
            alt="company"
          />
        ))}
      </footer>
    </div>
  );
}
