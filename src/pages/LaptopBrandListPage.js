import React from "react";
import Header from "../components/header/Header";
import LaptopBrandList from "../components/products/LaptopBrandList";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";

export default function LaptopBrandListPage() {
  return (
    <div>
      <Header />
      <LaptopBrandList />
      <Footer />
      <ScrollToTop/>
    </div>
  );
}
