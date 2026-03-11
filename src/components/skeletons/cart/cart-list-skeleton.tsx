import CartItemSkeleton from "./cart-item-skeleton";

type CartListSkeletonProps = {
  items?: number;
  className?: string;
};

export default function CartListSkeleton({
  items = 3,
  className,
}: CartListSkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: items }).map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
    </div>
  );
}
