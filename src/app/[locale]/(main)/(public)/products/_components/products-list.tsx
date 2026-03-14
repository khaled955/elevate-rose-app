import AppPagination from "@/components/shared/app-pagination";
import ProductCard from "@/components/shared/product-card";
import { Link } from "@/i18n/navigation";
import { fetchAllProductService } from "@/lib/actions/products/fetch-all-product.service";
import { SearchParams } from "@/lib/types/common";
import { Products } from "@/lib/types/product";
import catchError from "@/lib/utils/catch-error";
import { getLocale, getTranslations } from "next-intl/server";

type ProductsListProps = {
  pathName: string;
  searchParams: SearchParams;
};

export default async function ProductsList({
  pathName,
  searchParams,
}: ProductsListProps) {
  // Translation
  const t = await getTranslations()
  const locale = await getLocale();

  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? "1",
    limit: searchParams.limit ?? "8",
  };

  const [payload, error] = await catchError<PaginatedResponse<Products>>(() =>
    fetchAllProductService(nextParams),
  );

  if (error || !payload || "error" in payload) {
    throw new Error(payload?.message || "Error During Fetch Products");
  }

  const totalPages = payload.metadata?.totalPages ?? 1;

  return (
    <div className="w-full flex-1">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {payload.products.length > 0 &&
          payload.products.map((product) => (
            <ProductCard
              key={product._id}
              priceBeforeSale={product.price}
              productId={product._id}
              priceAfterSale={product.priceAfterDiscount!}
              rate={product.rateAvg}
              salesCount={product.sold}
              src={product.imgCover}
              title={product.title}
              showWishListBtn={true}
              productQuantity={product.quantity}
              productInfo={product}
            />
          ))}
      </div>

      {/* label for invalid products */}
      {payload.products.length === 0 && (
        <p
          className="
    w-full text-center flex flex-col items-center gap-4
    text-sm sm:text-base
    text-zinc-700 dark:text-zinc-400
  "
        >
          <span className="text-3xl" aria-hidden>
            🌸
          </span>

          <span className="font-medium">{t('no-products-found-for-this-page')}</span>

          <span className="max-w-md leading-relaxed">
            {t('product-filter')}
          </span>

          <Link
            href="/products"
            locale={locale}
            className="
      inline-flex items-center justify-center
      rounded-md px-4 py-2 text-sm font-medium
      bg-maroon-600 text-white
      hover:bg-maroon-700
      transition-colors
      dark:bg-soft-pink-300 dark:text-maroon-800
      dark:hover:bg-soft-pink-200
    "
          >
            View all products
          </Link>
        </p>
      )}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <AppPagination
            pathname={pathName}
            searchParams={searchParams}
            currentPage={payload.metadata.currentPage}
            totalPages={totalPages}
            show={payload.products.length > 0}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
}
