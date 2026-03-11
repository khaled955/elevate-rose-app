"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Crumb = {
  href: string;
  label: string;
  isCurrent?: boolean;
};

type BreadcrumbsProps = {
  className?: string;
  overrides?: Record<string, string>;
  showToggle?: boolean;
  onToggleSidebar?: () => void;
};

const TRANSLATABLE_KEYS = new Set([
  "dashboard",
  "products",
  "categories",
  "profile",
  "create",
  "add",
  "update",
  "edit",
  "new",
]);

const ENTITY_SEGMENTS = new Set(["categories", "products", "occassions"]);

const ENTITY_SINGULAR: Record<string, Record<string, string>> = {
  en: {
    categories: "Category",
    products: "Product",
    occassions: "Occasion",
  },
  ar: {
    categories: "فئة",
    products: "منتج",
    occassions: "مناسبة",
  },
};

const ENTITY_PLURAL: Record<string, Record<string, string>> = {
  en: {
    categories: "Categories",
    products: "Products",
    occassions: "Occassions",
  },
  ar: {
    categories: "الأقسام",
    products: "المنتجات",
    occassions: "المناسبات",
  },
};

const AR_CREATE_SUFFIX: Record<string, string> = {
  categories: "جديدة",
  products: "جديد",
  occassions: "جديدة",
};

const AR_UPDATE_NOUN: Record<string, string> = {
  categories: "الفئة الحالية",
  products: "المنتج الحالي",
  occassions: "المناسبة الحالية",
};

function prettifySegment(seg: string): string {
  return decodeURIComponent(seg)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isIdLike(seg: string): boolean {
  return /^[a-f0-9]{24}$/i.test(seg) || /^[0-9a-f-]{32,36}$/i.test(seg);
}

export default function Breadcrumbs({
  className,
  overrides,
  showToggle,
  onToggleSidebar,
}: BreadcrumbsProps) {
  // Translations
  const t = useTranslations("breadcrumbs");
  const locale = useLocale();

  // Navigation
  const pathname = usePathname();

  function getLabel(seg: string): string {
    if (ENTITY_SEGMENTS.has(seg)) {
      return (
        ENTITY_PLURAL[locale]?.[seg] ??
        ENTITY_PLURAL["en"][seg] ??
        prettifySegment(seg)
      );
    }
    return TRANSLATABLE_KEYS.has(seg) ? t(seg) : prettifySegment(seg);
  }

  function getSingular(entitySeg: string): string {
    return (
      ENTITY_SINGULAR[locale]?.[entitySeg] ??
      ENTITY_SINGULAR["en"][entitySeg] ??
      prettifySegment(entitySeg)
    );
  }

  // Arabic: "إنشاء فئة جديدة" / English: "Create New Category"
  function buildCreateLabel(entitySeg: string): string {
    if (locale === "ar") {
      const singular = getSingular(entitySeg);
      const suffix = AR_CREATE_SUFFIX[entitySeg] ?? "جديد";
      return `${t("create")} ${singular} ${suffix}`;
    }
    return `${t("create")} New ${getSingular(entitySeg)}`;
  }

  // Arabic: "تحديث الفئة الحالية" / English: "Update Category"
  function buildUpdateLabel(entitySeg: string): string {
    if (locale === "ar") {
      const noun = AR_UPDATE_NOUN[entitySeg] ?? getSingular(entitySeg);
      return `${t("update")} ${noun}`;
    }
    return `${t("update")} ${getSingular(entitySeg)}`;
  }

  const segments = (pathname || "")
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean);

  const crumbs: Crumb[] = [];
  let hrefAccumulator = "";

  const lastSeg = segments[segments.length - 1];
  const secondLastSeg = segments[segments.length - 2];
  const pathEndsWithId =
    lastSeg &&
    isIdLike(lastSeg) &&
    secondLastSeg &&
    ENTITY_SEGMENTS.has(secondLastSeg);

  segments.forEach((seg, idx) => {
    hrefAccumulator += `/${seg}`;

    if (isIdLike(seg)) {
      // /entity/[id] — implicit update crumb
      if (pathEndsWithId && idx === segments.length - 1) {
        const label = overrides?.[seg] ?? buildUpdateLabel(secondLastSeg);
        crumbs.push({ href: hrefAccumulator, label, isCurrent: true });
      }
      return;
    }

    const prev = segments[idx - 1];
    const isAction = ["create", "add", "update", "edit", "new"].includes(seg);
    let label = getLabel(seg);

    // /entity/create → "Create New Category"
    if (isAction && prev && ENTITY_SEGMENTS.has(prev)) {
      if (["create", "add", "new"].includes(seg)) {
        label = buildCreateLabel(prev);
      } else if (["update", "edit"].includes(seg)) {
        label = buildUpdateLabel(prev);
      }
    }

    // /entity/[id]/edit → "Update Category"
    if (isAction && prev && isIdLike(prev)) {
      const entity = segments[idx - 2];
      if (entity && ENTITY_SEGMENTS.has(entity)) {
        if (["update", "edit"].includes(seg)) {
          label = buildUpdateLabel(entity);
        } else if (["create", "add", "new"].includes(seg)) {
          label = buildCreateLabel(entity);
        }
      }
    }

    if (overrides?.[seg]) label = overrides[seg];

    crumbs.push({
      href: hrefAccumulator,
      label,
      isCurrent: idx === segments.length - 1,
    });
  });

  if (crumbs.length === 0) return null;

  const isRTL = locale === "ar";
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {showToggle ? (
        <button
          type="button"
          onClick={onToggleSidebar}
          className={cn(
            "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl",
            "border border-black/10 bg-white text-zinc-800 shadow-sm",
            "transition hover:bg-zinc-50",
            "dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700",
          )}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      ) : null}

      <nav
        aria-label="Breadcrumb"
        className={cn(
          "flex flex-1 items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400",
        )}
      >
        {crumbs.map((c, i) => (
          <React.Fragment key={c.href}>
            {i !== 0 && (
              <span className="text-gray-500 dark:text-gray-700">
                <Chevron className="h-4 w-4" />
              </span>
            )}
            {c.isCurrent ? (
              <span className="font-medium text-maroon-600 dark:text-maroon-50">
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition"
              >
                {c.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
