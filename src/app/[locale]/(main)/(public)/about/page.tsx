import {
  Leaf,
  Sparkles,
  Truck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/i18n/navigation";

export default function AboutPage() {
  // Translation
  const t = useTranslations("aboutPage");
  const locale = useLocale();
  const isAr = locale === "ar";

  // Variables
  const values = [
    {
      icon: Sparkles,
      title: t("values.items.0.title"),
      desc: t("values.items.0.desc"),
    },
    {
      icon: Leaf,
      title: t("values.items.1.title"),
      desc: t("values.items.1.desc"),
    },
    {
      icon: Truck,
      title: t("values.items.2.title"),
      desc: t("values.items.2.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("values.items.3.title"),
      desc: t("values.items.3.desc"),
    },
  ];

  const stats = [
    { label: t("stats.items.0.label"), value: t("stats.items.0.value") },
    { label: t("stats.items.1.label"), value: t("stats.items.1.value") },
    { label: t("stats.items.2.label"), value: t("stats.items.2.value") },
  ];

  return (
    <main className="relative">
      {/* soft background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-gradient-to-b from-rose-50 via-white to-white",
          "dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]",
          "bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.20),transparent_60%)]",
          "dark:bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.16),transparent_60%)]",
        )}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* Hero */}
        <header className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className={cn("space-y-5", isAr && "text-right")}>
            <p
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm",
                "border-rose-200 bg-white/70 text-rose-700",
                "dark:border-rose-900/50 dark:bg-zinc-950/50 dark:text-rose-200",
              )}
            >
              <HeartHandshake className="h-4 w-4" />
              {t("badge")}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
              {t("hero.title")}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className={cn("flex flex-wrap gap-3", isAr && "justify-end")}>
              <Link
                href="/products"
                locale={locale}
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "bg-rose-600 text-white shadow-sm hover:bg-rose-700",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500",
                )}
              >
                {t("hero.ctaPrimary")}
              </Link>

              <Link
                href="/contact"
                locale={locale}
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50",
                  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900/40",
                )}
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div
              className={cn(
                "rounded-2xl border p-6 shadow-sm",
                "border-zinc-200 bg-white/80",
                "dark:border-zinc-800 dark:bg-zinc-950/60",
              )}
            >
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {t("heroCard.title")}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {t("heroCard.desc")}
                </p>

                <ul className="grid gap-3">
                  {[0, 1, 2].map((i) => (
                    <li
                      key={i}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-3",
                        "border-zinc-200 bg-white",
                        "dark:border-zinc-800 dark:bg-zinc-950",
                      )}
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <div className={cn("space-y-1", isAr && "text-right")}>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          {t(`heroCard.points.${i}.title`)}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">
                          {t(`heroCard.points.${i}.desc`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-rose-500/10 blur-2xl dark:bg-rose-500/10" />
          </div>
        </header>

        {/* Values */}
        <section className="mt-12 md:mt-16">
          <div className={cn("mb-6 space-y-2", isAr && "text-right")}>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {t("values.title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              {t("values.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={cn(
                    "rounded-2xl border p-5 shadow-sm transition hover:shadow-md",
                    "border-zinc-200 bg-white",
                    "dark:border-zinc-800 dark:bg-zinc-950",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className={cn("space-y-1", isAr && "text-right")}>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Story + Stats */}
        <section className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:items-stretch">
          <div
            className={cn(
              "rounded-2xl border p-6 shadow-sm md:col-span-7",
              "border-zinc-200 bg-white",
              "dark:border-zinc-800 dark:bg-zinc-950",
            )}
          >
            <div className={cn("space-y-3", isAr && "text-right")}>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {t("story.title")}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300">{t("story.p1")}</p>
              <p className="text-zinc-600 dark:text-zinc-300">{t("story.p2")}</p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div
              className={cn(
                "rounded-2xl border p-6 shadow-sm",
                "border-zinc-200 bg-white",
                "dark:border-zinc-800 dark:bg-zinc-950",
              )}
            >
              <div className={cn("space-y-4", isAr && "text-right")}>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {t("stats.title")}
                </h3>

                <div className="grid gap-3">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-4",
                        "border-zinc-200 bg-white",
                        "dark:border-zinc-800 dark:bg-zinc-950",
                      )}
                    >
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                        {s.label}
                      </p>
                      <p className="text-base font-bold text-rose-700 dark:text-rose-200">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p
              className={cn(
                "mt-3 text-xs text-zinc-500 dark:text-zinc-400",
                isAr && "text-right",
              )}
            >
              {t("stats.note")}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 md:mt-16">
          <div
            className={cn(
              "rounded-2xl border p-6 shadow-sm md:p-8",
              "border-rose-200 bg-rose-50",
              "dark:border-rose-900/50 dark:bg-rose-950/20",
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                isAr && "md:flex-row-reverse",
              )}
            >
              <div className={cn("space-y-1", isAr && "text-right")}>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {t("cta.title")}
                </h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {t("cta.desc")}
                </p>
              </div>

              <Link
                href="/products"
                locale={locale}
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "bg-rose-600 text-white hover:bg-rose-700",
                )}
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
