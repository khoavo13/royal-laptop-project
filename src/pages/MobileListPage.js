import React from 'react'
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer";
import MobileList from '../components/products/MobileList';
import ScrollToTop from '../components/scrollToTop/ScrollToTop';


export default function MobileListPage() {
  return (
    <div>
        <Header/>
        <MobileList/>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}
