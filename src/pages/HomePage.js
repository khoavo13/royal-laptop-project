import React, { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import IntroSlider from "../components/home/IntroSlider";
import FeaturedMobile from "../components/home/FeaturedMobile";
import FeaturedLaptop from "../components/home/FeaturedLaptop";
import PopularBrand from "../components/home/PopularBrand";
import StudentDiscount from "../components/home/StudentDiscount";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div>
      <Header />
      <IntroSlider />
      <StudentDiscount/>
      <FeaturedMobile />
      <FeaturedLaptop />
      <PopularBrand />
      <Footer />
      <ScrollToTop/>
    </div>
  );
}
