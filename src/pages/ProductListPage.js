import React from 'react'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductList from '../components/products/ProductList';
import ScrollToTop from '../components/scrollToTop/ScrollToTop';

export default function ProductListPage() {
    
  return (
    <div>
      <Header />
      <ProductList/>
      <Footer/>
      <ScrollToTop/>
    </div>
  )
}
