"use client";

import FeedbackError from "@/components/shared/feedback-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Loader, UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ProductFields,
  UpdateProductFields,
  useProductSchema,
  useUpdateProductSchema,
} from "@/lib/schemas/dashboard-schema/product.schema";
import { useCategories } from "../../categories/_hooks/use-categories";
import { useOccassions } from "../../occassions/_hooks/use-occassions";
import Image from "next/image";

const defaultValues = {
  title: "",
  description: "",
  price: "",
  discount: "",
  priceAfterDiscount: "",
  quantity: "",
  category: "",
  occasion: "",
  images: [],
};

type CreateMode = {
  mode?: "create";
  onSubmit: (data: ProductFields, onSuccess: () => void) => void;
  initialValues?: Partial<ProductFields>;
};

type UpdateMode = {
  mode: "update";
  onSubmit: (data: UpdateProductFields, onSuccess: () => void) => void;
  initialValues?: Partial<UpdateProductFields>;
};

type ProductFormProps = (CreateMode | UpdateMode) & {
  isPending: boolean;
  error?: Error | null;
  submitLabel?: string;
};

export default function ProductForm({
  onSubmit,
  isPending,
  error,
  initialValues,
  submitLabel,
  mode = "create",
}: ProductFormProps) {
  // Translations
  const t = useTranslations();

  // Queries
  const { data: categoriesPayload } = useCategories({});
  const { data: occasionsPayload } = useOccassions({});

  // Variables
  const categoryList = categoriesPayload?.categories || [];
  const occasionList = occasionsPayload?.occasions || [];
  const isUpdate = mode === "update";
  const createSchema = useProductSchema();
  const updateSchema = useUpdateProductSchema();
  const schema = isUpdate ? updateSchema : createSchema;
  // States
  const [coverPreview, setCoverPreview] = useState<string | null>(
    typeof initialValues?.imgCover === "string" ? initialValues.imgCover : null,
  );
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    Array.isArray(initialValues?.images)
      ? (initialValues.images.filter((i) => typeof i === "string") as string[])
      : [],
  );

  // Refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // Watch price & discount to auto-calculate priceAfterDiscount
  const watchedPrice = useWatch({ control, name: "price" });
  const watchedDiscount = useWatch({ control, name: "discount" });

  // Functions
  // Resets form fields, previews, and file inputs
  function handleReset() {
    reset({ ...defaultValues, ...initialValues });
    setCoverPreview(
      typeof initialValues?.imgCover === "string"
        ? initialValues.imgCover
        : null,
    );
    setGalleryPreviews(
      Array.isArray(initialValues?.images)
        ? (initialValues.images.filter(
            (i) => typeof i === "string",
          ) as string[])
        : [],
    );
    if (coverInputRef.current) coverInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }

  // Cover image handler
  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("imgCover", file, { shouldValidate: true });
    setCoverPreview(URL.createObjectURL(file));
  }

  function handleRemoveCover() {
    setValue("imgCover", undefined as unknown as File, {
      shouldValidate: true,
    });
    setCoverPreview(null);
    if (coverInputRef.current) coverInputRef.current.value = "";
  }

  // Gallery images handler
  function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const existing = getValues("images") || [];
    const merged = [...existing, ...files];
    setValue("images", merged, { shouldValidate: true });
    setGalleryPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function handleRemoveGalleryImage(index: number) {
    const existing = getValues("images") || [];
    const updated = existing.filter((_: unknown, i: number) => i !== index);
    setValue("images", updated, { shouldValidate: true });
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  // Effects
  useEffect(() => {
    const price = parseFloat(watchedPrice || "0");
    const discount = parseFloat(watchedDiscount || "0");
    if (!isNaN(price) && !isNaN(discount) && price > 0 && discount > 0) {
      const result = price - (price * discount) / 100;
      setValue("priceAfterDiscount", String(result));
    } else {
      setValue("priceAfterDiscount", "");
    }
  }, [watchedPrice, watchedDiscount, setValue]);

  return (
    <form
      onSubmit={handleSubmit((data) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (onSubmit as any)(data, handleReset),
      )}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <Label htmlFor="title">
          {t("title")} <span className="text-red-500">*</span>
        </Label>
        <Input {...register("title")} id="title" placeholder={t("title-0")} />
        {errors.title && (
          <FeedbackError errorMsg={errors.title.message as string} />
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">
          {t("description")} <span className="text-red-500">*</span>
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          placeholder={t("enter-product-description")}
          rows={4}
        />
        {errors.description && (
          <FeedbackError errorMsg={errors.description.message as string} />
        )}
      </div>

      {/* Price / Discount / Price after discount */}
      <div
        className={`grid grid-cols-1 gap-4 ${isUpdate ? "sm:grid-cols-1" : "sm:grid-cols-3"}`}
      >
        {/* Price */}
        <div>
          <Label htmlFor="price">
            {t("price")} <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("price")}
            id="price"
            type="number"
            min={0}
            placeholder={t("example-5000")}
          />
          {errors.price && (
            <FeedbackError errorMsg={errors.price.message as string} />
          )}
        </div>

        {/* Discount + Price after discount — hidden on update */}
        {!isUpdate && (
          <>
            <div>
              <Label htmlFor="discount">{t("discount")}</Label>
              <Input
                {...register("discount")}
                id="discount"
                type="number"
                min={0}
                placeholder={t("example-5")}
              />
              {errors.discount && (
                <FeedbackError errorMsg={errors.discount.message as string} />
              )}
            </div>

            <div>
              <Label htmlFor="priceAfterDiscount">
                {t("price-after-discount")}
              </Label>
              <Input
                {...register("priceAfterDiscount")}
                id="priceAfterDiscount"
                type="number"
                placeholder={t("example-5")}
                readOnly
                className="bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed"
              />
            </div>
          </>
        )}
      </div>

      {/* Quantity */}
      <div>
        <Label htmlFor="quantity">
          {t("quantity")} <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("quantity")}
          id="quantity"
          type="number"
          min={0}
          placeholder={t("example-200")}
        />
        {errors.quantity && (
          <FeedbackError errorMsg={errors.quantity.message as string} />
        )}
      </div>

      {/* imgCover + images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Product cover */}
        <div>
          <Label>
            {t("product-cover")}{" "}
            {!isUpdate && <span className="text-red-500">*</span>}
          </Label>
          <div className="mt-1 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl p-3 min-h-[100px] flex flex-col items-center justify-center gap-2 relative">
            {coverPreview ? (
              <div className="relative w-full">
                <Image
                  src={coverPreview}
                  alt="cover-preview"
                  width={400}
                  height={128}
                  unoptimized
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="absolute top-1 right-1 bg-white dark:bg-zinc-800 rounded-full p-0.5 shadow"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center gap-1 cursor-pointer text-zinc-400 hover:text-maroon-700 dark:hover:text-soft-pink-200 transition-colors">
                <UploadCloud className="w-6 h-6" />
                <span className="text-sm">{t("upload-file")}</span>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverChange}
                />
              </label>
            )}
          </div>
          {errors.imgCover && (
            <FeedbackError errorMsg={errors.imgCover.message as string} />
          )}
        </div>

        {/* Product gallery */}
        <div>
          <Label>
            {t("product-gallery")}{" "}
            {!isUpdate && <span className="text-red-500">*</span>}
          </Label>
          <div className="mt-1 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl p-3 min-h-[100px] flex flex-col items-center justify-center gap-2">
            {galleryPreviews.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 w-full">
                {galleryPreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <Image
                      src={src}
                      alt={`gallery-${i}`}
                      width={100}
                      height={64}
                      unoptimized
                      className="w-full h-16 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(i)}
                      className="absolute top-0.5 right-0.5 bg-white dark:bg-zinc-800 rounded-full p-0.5 shadow"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                ))}
                {/* Add more */}
                <label className="flex flex-col items-center justify-center h-16 border border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg cursor-pointer text-zinc-400 hover:text-maroon-700 dark:hover:text-soft-pink-200 transition-colors">
                  <UploadCloud className="w-4 h-4" />
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryChange}
                  />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center gap-1 cursor-pointer text-zinc-400 hover:text-maroon-700 dark:hover:text-soft-pink-200 transition-colors">
                <UploadCloud className="w-6 h-6" />
                <span className="text-sm">{t("upload-file")}</span>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryChange}
                />
              </label>
            )}
          </div>
          {errors.images && (
            <FeedbackError errorMsg={errors.images.message as string} />
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <Label>
          {t("category")} <span className="text-red-500">*</span>
        </Label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("select-an-option")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryList.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <FeedbackError errorMsg={errors.category.message as string} />
        )}
      </div>

      {/* Occasion — hidden on update */}
      {!isUpdate && (
        <div>
          <Label>
            {t("occasion")} <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="occasion"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("select-an-option")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {occasionList.map((occ) => (
                      <SelectItem key={occ._id} value={occ._id}>
                        {occ.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.occasion && (
            <FeedbackError errorMsg={errors.occasion.message as string} />
          )}
        </div>
      )}

      {/* Submit */}
      <div>
        <Button
          disabled={isPending || (!isValid && isSubmitted)}
          type="submit"
          className="w-full py-6 bg-maroon-700 hover:bg-maroon-800 dark:bg-soft-pink-200 dark:hover:bg-soft-pink-300 text-white"
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            (submitLabel ?? t("add-product"))
          )}
        </Button>
        {/* Server-error */}
        {error && (
          <FeedbackError
            className="text-center font-bold mt-3"
            errorMsg={error.message}
          />
        )}
      </div>
    </form>
  );
}
