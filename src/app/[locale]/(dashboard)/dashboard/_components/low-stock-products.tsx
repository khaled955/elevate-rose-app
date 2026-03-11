import { cn } from "@/lib/utils/cn";
import ListCard from "./statistic-list-card";
import { getFormatter, getTranslations } from "next-intl/server";
import catchError from "@/lib/utils/catch-error";
import { Products } from "@/lib/types/product";
import { fetchAllProductService } from "@/lib/actions/products/fetch-all-product.service";

type LowStockProductsProps = {
  title?: string;
  className?: string;
  listClassName?: string;
};

export default async function LowStockProducts({
  listClassName = "max-h-72",
}: LowStockProductsProps) {
  // Translations
  const t = await getTranslations();
  const formate = await getFormatter();
  //Variables
  const [payload] = await catchError<APIResponse<PaginatedResponse<Products>>>(
    () =>
      fetchAllProductService({
        "quantity[gte]": "0",
        sort: "quantity",
        limit: "10",
      }),
  );

  //catch-error
  if (payload && "error" in payload) {
    throw new Error(
      payload.error ||
        "Error during fetch top low stock products in dashboard!",
    );
  }

  const productList = payload?.products || [];

  const listItems = productList.map((p) => ({
    id: p._id,

    title: (
      <span className="text-sm font-medium text-foreground">
        {p.title}
        {p.slug ? (
          <span className="text-muted-foreground"> | {p.slug}</span>
        ) : null}
      </span>
    ),

    // Right
    rightText: (
      <span
        className={cn(
          "text-xs font-semibold tabular-nums",
          p.quantity < 5 ? "text-red-600" : "text-zinc-800 dark:text-zinc-100",
        )}
      >
        {t("product-stock", {
          count: p.quantity,
          formattedCount: formate.number(p.quantity, "number-base"),
        })}
      </span>
    ),
  }));

  return (
    <section>
      {/* List */}
      <ListCard
        items={listItems}
        listClassName={cn("mt-0", listClassName)}
        rowClassName={"border-b"}
      />
    </section>
  );
}
