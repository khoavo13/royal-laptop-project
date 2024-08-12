import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderPage from "./pages/OrderPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, fetchProductsIsLaptop, fetchProductsIsMobile } from "./redux/productSlice";
import MobileListPage from "./pages/MobileListPage";
import LaptopListPage from "./pages/LaptopListPage";
import WarrantyPage from "./pages/WarrantyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import MobileBrandListPage from "./pages/MobileBrandListPage";
import LaptopBrandListPage from "./pages/LaptopBrandListPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductsIsMobile())
    dispatch(fetchProductsIsLaptop())
  }, []);
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route index element={<HomePage/>}></Route>
          <Route path='/login'element={<LoginPage/>}></Route>
          <Route path='/register'element={<RegisterPage/>}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path='/product'element={<ProductListPage/>}></Route>
          <Route path='/product/:id'element={<ProductDetailPage/>}></Route>
          <Route path='/product/mobile'element={<MobileListPage/>}></Route>
          <Route path='/product/laptop'element={<LaptopListPage/>}></Route>
          <Route path='/product/mobile/:brand'element={<MobileBrandListPage/>}></Route>
          <Route path='/product/laptop/:brand'element={<LaptopBrandListPage/>}></Route>
          <Route path='/cart'element={<CartPage/>}></Route>
          <Route path='/order'element={<OrderPage/>}></Route>
          <Route path='/warranty'element={<WarrantyPage/>}></Route>
          <Route path='/contact'element={<ContactPage/>}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;