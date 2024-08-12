import React from 'react'
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer";
import LaptopList from '../components/products/LaptopList';
import ScrollToTop from '../components/scrollToTop/ScrollToTop';

export default function LaptopListPage () {
  return (
    <div>
        <Header/>
        <LaptopList/>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}
