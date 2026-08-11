import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryTicker from "./components/CategoryTicker";
import LuxuryVideoBanner from "./components/LuxuryVideoBanner";

import TrustBadges from "./components/TrustBadges";
import BestSellers from "./components/BestSellers";
import FeaturedProducts from "./components/FeaturedProducts";
import NewArrivals from "./components/NewArrivals";
import FlashSale from "./components/FlashSale";
import TodaysDeals from "./components/TodaysDeals";
import WhyChooseUs from "./components/WhyChooseUs";
import CustomerReviews from "./components/CustomerReviews";
import InstagramGallery from "./components/InstagramGallery";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* Hero Section */}
        <Hero />

        {/* Shop By Category */}
        <CategoryTicker />

        {/* Luxury Video Banner */}
        <LuxuryVideoBanner />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Best Sellers */}
        <BestSellers />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* New Arrivals */}
        <NewArrivals />

        {/* Flash Sale */}
        <FlashSale />

        {/* Today's Deals */}
        <TodaysDeals />

        {/* Why Shop With SmartCart - ONLY ONE */}
        <WhyChooseUs />

        {/* Customer Reviews */}
        <CustomerReviews />

        {/* Instagram Gallery */}
        <InstagramGallery />

        {/* Newsletter */}
        <Newsletter />

      </main>

      <Footer />
    </>
  );
}