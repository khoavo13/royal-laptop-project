import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlide from "./cartSlide";

const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlide,
    }
})

export default store;