import { cn } from "@/lib/utils/cn";
import ListCard from "./statistic-list-card";
import { Products } from "@/lib/types/product";
import catchError from "@/lib/utils/catch-error";
import { fetchAllProductService } from "@/lib/actions/products/fetch-all-product.service";
import { getFormatter, getTranslations } from "next-intl/server";

type TopSellingProductsProps = {
  className?: string;
  listClassName?: string;
};

export default async function TopSellingProducts({
  className,
  listClassName = "max-h-72",
}: TopSellingProductsProps) {
  // Translations
  const t = await getTranslations();
  const formate = await getFormatter();
  // ===== Variables =====
  const [payload] = await catchError<APIResponse<PaginatedResponse<Products>>>(
    () => fetchAllProductService({ sort: "-sold", limit: "10" }),
  );

  //catch-error
  if (payload && "error" in payload) {
    throw new Error(
      payload.error || "Error during fetch top selling products in dashboard!",
    );
  }

  const items = payload?.products || [];

  const listItems = items.map((p) => ({
    id: p._id,
    title: (
      <span className="text-sm font-medium text-foreground truncate">
        {p.title}

        {p.price ? (
          <span className="text-xs text-muted-foreground inline-block ps-3">
            {" "}
            {t("product-price", { price: p.price })}
          </span>
        ) : null}
      </span>
    ),
    rightText: (
      <span className="text-xs font-semibold tabular-nums">
        {t("product-sales", {
          count: p.sold,
          formattedCount: formate.number(p.sold, "number-base"),
        })}
      </span>
    ),
  }));

  // ===== Helpers =====
  function getTopRowBg(index: number) {
    if (index === 0) return "bg-[#DFAC16]/25 dark:bg-[#DFAC16]/15";
    if (index === 1) return "bg-[#757F95]/10 dark:bg-[#757F95]/15";
    if (index === 2) return "bg-[#914400]/10 dark:bg-[#914400]/15";
    return "bg-zinc-100 dark:bg-zinc-900/40";
  }

  return (
    <section className={cn(className)}>
      {/* List */}
      <ListCard
        items={listItems}
        className="p-0"
        listClassName={cn("mt-0", listClassName)}
        rowClassName={cn(" mb-2 rounded-md")}
        badgeClassName="bg-transparent text-zinc-800 font-semibold"
        getRowClassName={({ index }) => getTopRowBg(index)}
      />
    </section>
  );
}
