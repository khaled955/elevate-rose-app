import BestSellers from "./_components/best-sellers";
import EmlaCarouselComponent from "./_components/emla-carousel";
import GiftCard from "./_components/gift-card";
import HomeAbout from "./_components/home-about";
import HomeGallery from "./_components/home-gallery";
import HomePartnerCompanies from "./_components/home-partner-companies";
import Testimonial from "./_components/home-testimonial";
import OccasionList from "./_components/occasion-list";
import ServicesList from "./_components/services-list";
import MostPopular from "./_components/most-popular";

export default function HomePage() {
  return (
    <>
      {/* Carousel */}
      <section className="container-home grid grid-cols-12 gap-4">
        <GiftCard />
        <EmlaCarouselComponent />
      </section>

      {/* occassion card */}
      <section className="ocassions-list">
        <OccasionList />
      </section>

      {/* Services-list */}
      <section className="services">
        <ServicesList />
      </section>

      {/*best-sellers */}
      <section className="best-sellers">
        <BestSellers />
      </section>

      <section className="most-popular">
        <MostPopular />
      </section>

      {/*home-about */}
      <section className="home-about">
        <HomeAbout />
      </section>

      {/*home-gallery */}
      <section className="home-galler">
        <HomeGallery />
      </section>
      {/* home-companies */}
      <section className="partner-companies">
        <HomePartnerCompanies />
      </section>

      {/* home-testimonials */}
      <section className="home-testimonials">
        <Testimonial />
      </section>
    </>
  );
}
