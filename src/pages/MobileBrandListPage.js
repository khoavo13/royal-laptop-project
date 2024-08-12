import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import MobileBrandList from '../components/products/MobileBrandList'
import ScrollToTop from '../components/scrollToTop/ScrollToTop'

export default function MobileBrandListPage() {
  return (
    <div>
        <Header/>
        <MobileBrandList/>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}
