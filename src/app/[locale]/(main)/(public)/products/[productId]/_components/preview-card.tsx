import { RatingStars } from "@/components/ui/ring-stars";
import { Review } from "@/lib/types/preview";
import { useFormatter } from "next-intl";
import Image from "next/image";
type PreviewCardProps = {
  reviewInfo: Review;
};

export default function PreviewCard({ reviewInfo }: PreviewCardProps) {
  // Translations
  const formate = useFormatter();
  return (
    <section className="border-s border-zinc-200 ps-3 shadow-sm py-4 dark:shadow-zinc-200">
      <header className="flex gap-3 items-center mb-4">
        <div className="relative">
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={reviewInfo.user.photo}
            alt={reviewInfo.user.firstName}
          />
        </div>
        <div className="avatar-info">
          <h2 className="text-base font-semibold text-zinc-800 dark:text-soft-pink-200">
            {reviewInfo.user.firstName}
          </h2>
          <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
            {formate.dateTime(new Date(reviewInfo.createdAt), "date-only")}
          </span>
        </div>
      </header>
      <main>
        <div className="rating-info flex gap-2 items-center">
          {/*rating-stars-component */}
          <RatingStars rateAvg={reviewInfo.rating} />
          <span className="text-base font-semibold text-zinc-800 dark:text-maroon-500">
            ({reviewInfo.rating})
          </span>
        </div>
        <div className="rating-text mt-4">
          <h2 className="text-base font-semibold text-black dark:text-zinc-50">
            {reviewInfo.title}
          </h2>
          <p className="text-base font-normal text-zinc-600 dark:text-zinc-300">
            {reviewInfo.comment}
          </p>
        </div>
      </main>
    </section>
  );
}
