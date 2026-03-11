import WishlistHeader from "./wishlist-header";
import WishlistList from "./wishlist-list";

export default function WishlistWrapper() {
  return (
    // Layout
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <WishlistHeader />
      <WishlistList />
    </section>
  );
}
