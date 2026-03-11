import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Locale } from "next-intl";

/**
 * Props for AppPagination component.
 */
type Props = {
  /**
   * Current route pathname without query string.
   * Example: "/products" or "/en/products"
   */
  pathname: string;

  /**
   * Current search params object coming from a Server Component.
   * All params (filters, limit, sort, etc.) will be preserved
   * while only `page` gets updated.
   */
  searchParams: Record<string, string | string[] | undefined>;

  /**
   * Currently active page (1-based index).
   */
  currentPage: number;

  /**
   * Total number of pages from API metadata.
   */
  totalPages: number;

  /**
   * Number of pages shown before and after the current page.
   * Example:
   *  windowSize = 2, currentPage = 4
   *  → 2, 3, 4, 5, 6
   *
   * @default 2
   */
  windowSize?: number;

  /**
   * Control rendering of pagination UI.
   * Useful when pagination should be conditionally hidden.
   */
  show: boolean;

  /**
   * Current application locale (from next-intl).
   * Used to:
   * - Detect RTL vs LTR
   * - Swap icons direction
   * - Localize aria-labels
   */
  locale: Locale;
};

/**
 * Creates a pagination URL while preserving all existing query params.
 * Only updates the `page` query parameter.
 *
 * @param pathname - Route pathname without query string.
 * @param searchParams - Existing query params.
 * @param page - Target page number (1-based).
 * @returns Full URL including updated query string.
 */
function createHref(
  pathname: string,
  searchParams: Record<string, string | string[] | undefined>,
  page: number,
) {
  const sp = new URLSearchParams();

  // Preserve all existing params (including array params)
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined) return;
    if (Array.isArray(value)) value.forEach((v) => sp.append(key, v));
    else sp.set(key, value);
  });

  // Update page param only
  sp.set("page", String(page));

  return `${pathname}?${sp.toString()}`;
}

/**
 * Generates pagination range with ellipsis.
 *
 * Pattern:
 *  1 … (current - windowSize → current + windowSize) … last
 *
 * Example:
 *  current = 4, total = 10, windowSize = 2
 *  → [1, "...", 2, 3, 4, 5, 6, "...", 10]
 *
 * @param current - Current page.
 * @param total - Total pages.
 * @param windowSize - Pages before/after current.
 */
function getRange(current: number, total: number, windowSize: number) {
  if (total <= 1) return [];

  const first = 1;
  const last = total;

  const start = Math.max(first + 1, current - windowSize);
  const end = Math.min(last - 1, current + windowSize);

  const items: (number | "ellipsis")[] = [];

  // Always show first page
  items.push(first);

  // Left ellipsis if needed
  if (start > first + 1) items.push("ellipsis");

  // Page window
  for (let p = start; p <= end; p++) items.push(p);

  // Right ellipsis if needed
  if (end < last - 1) items.push("ellipsis");

  // Always show last page
  if (last !== first) items.push(last);

  return items;
}

/**
 * Base styles for navigation buttons (first / prev / next / last).
 *
 * @param disabled - Whether button should be disabled.
 */
function baseBtn(disabled: boolean) {
  return [
    "h-11 min-w-11 px-4",
    "rounded-xl border",
    "text-base font-medium",
    "transition-colors",
    "bg-white hover:bg-zinc-50",
    "border-zinc-200 text-zinc-900",
    "dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900",
    disabled ? "pointer-events-none opacity-50" : "",
  ].join(" ");
}

/**
 * Styles for numbered page buttons.
 *
 * @param active - Whether page is the current page.
 */
function pageBtn(active: boolean) {
  return [
    "h-11 min-w-11 px-4",
    "rounded-xl border",
    "text-base font-medium",
    "transition-colors",
    active
      ? "bg-maroon-700 text-white border-maroon-700 hover:bg-maroon-700 dark:bg-soft-pink-200 dark:text-zinc-700"
      : "bg-white text-zinc-900 border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
  ].join(" ");
}

/**
 * Returns localized aria-labels for pagination controls.
 * Used for accessibility (screen readers).
 */
function getLabels(locale: Locale) {
  if (locale === "ar") {
    return {
      first: "الصفحة الأولى",
      prev: "الصفحة السابقة",
      next: "الصفحة التالية",
      last: "الصفحة الأخيرة",
    };
  }

  return {
    first: "First page",
    prev: "Previous page",
    next: "Next page",
    last: "Last page",
  };
}

/**
 * AppPagination
 * ------------------------------------------------------------------
 * Server-friendly pagination component based on shadcn/ui.
 *
 * Features:
 * - Works in Server Components (no state, no callbacks).
 * - Preserves existing query params.
 * - Supports RTL (Arabic) and LTR (English).
 * - Accessible (aria-labels).
 * - Customizable window size.
 * - Styled according to design system (maroon active page).
 */
export default function AppPagination({
  pathname,
  searchParams,
  currentPage,
  totalPages,
  windowSize = 2,
  show = true,
  locale = "en",
}: Props) {
  // Hide pagination if disabled or unnecessary
  if (!show || totalPages <= 1) return null;

  const items = getRange(currentPage, totalPages, windowSize);

  // Edge detection
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  // RTL detection (Arabic)
  const isRTL = locale === "ar";
  const labels = getLabels(locale);

  // Swap icons direction in RTL
  const FirstIcon = isRTL ? ChevronsRight : ChevronsLeft;
  const LastIcon = isRTL ? ChevronsLeft : ChevronsRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <Pagination dir={isRTL ? "rtl" : "ltr"}>
      <PaginationContent className="gap-2">
        {/* First page */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.first}
            className={baseBtn(isFirst)}
          >
            <Link href={createHref(pathname, searchParams, 1)}>
              <FirstIcon className="size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Previous page */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.prev}
            className={baseBtn(isFirst)}
          >
            <Link
              href={createHref(
                pathname,
                searchParams,
                Math.max(1, currentPage - 1),
              )}
            >
              <PrevIcon className="size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Pages + ellipsis */}
        {items.map((it, idx) =>
          it === "ellipsis" ? (
            <PaginationItem key={`el-${idx}`}>
              <PaginationEllipsis className="px-2 text-zinc-500 dark:text-zinc-400" />
            </PaginationItem>
          ) : (
            <PaginationItem key={it}>
              <PaginationLink
                asChild
                isActive={it === currentPage}
                className={pageBtn(it === currentPage)}
              >
                <Link href={createHref(pathname, searchParams, it)}>{it}</Link>
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next page */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.next}
            className={baseBtn(isLast)}
          >
            <Link
              href={createHref(
                pathname,
                searchParams,
                Math.min(totalPages, currentPage + 1),
              )}
            >
              <NextIcon className="size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Last page */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.last}
            className={baseBtn(isLast)}
          >
            <Link href={createHref(pathname, searchParams, totalPages)}>
              <LastIcon className="size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
