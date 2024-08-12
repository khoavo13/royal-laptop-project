import { createSlice } from "@reduxjs/toolkit";
let initialState={}
if (localStorage.getItem("cart")){
    initialState = JSON.parse(localStorage.getItem("cart"))
}
else initialState = {
  carts: [],
  checkAll: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart(state, action) {
      const index = state.carts.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index >= 0) {
        state.carts[index].quantity++;
        state.carts[index].checked = true;
      } else {
        state.carts = [...state.carts, { ...action.payload, quantity: 1, checked: true }];
      }
      const isNoChecked = state.carts.findIndex(item => !item.checked)
      if (isNoChecked >= 0){
        state.checkAll = false
      }
      else state.checkAll = true
      localStorage.setItem("cart", JSON.stringify(state))
    },
    addItemCartByAmount(state, action){
      const index = state.carts.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index >= 0) {
        state.carts[index].quantity += action.payload.quantity;
        state.carts[index].checked = true;
      } else {
        state.carts = [...state.carts, { ...action.payload, checked: true }];
      }
      const isNoChecked = state.carts.findIndex(item => !item.checked)
      if (isNoChecked >= 0){
        state.checkAll = false
      }
      else state.checkAll = true
      localStorage.setItem("cart", JSON.stringify(state))
    },
    removeItemCart(state, action) {
      state.carts = state.carts.filter((item) => item.id !== action.payload.id);
      const isNoChecked = state.carts.findIndex(item => !item.checked)
      if (isNoChecked >= 0 || state.carts.length === 0){
        state.checkAll = false
      }
      else state.checkAll = true
      localStorage.setItem("cart", JSON.stringify(state))
    },
    clearCart(state) {
      state.carts = [];
      state.checkAll = false
      localStorage.setItem("cart", JSON.stringify(state))
    },
    updateQuantity(state, action) {
      const index = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      state.carts[index].quantity += action.payload.count;
      if (state.carts[index].quantity <= 1) {
        state.carts[index].quantity = 1
      }
      localStorage.setItem("cart", JSON.stringify(state))
    },
    updateCheckedItem(state, action){
      const index = state.carts.findIndex(item => item.id == action.payload)
      if (index >= 0){
        state.carts[index].checked = !state.carts[index].checked
      }

      const isNoChecked = state.carts.findIndex(item => !item.checked)
      if (isNoChecked >= 0){
        state.checkAll = false
      }
      else state.checkAll = true
      localStorage.setItem("cart", JSON.stringify(state))
    },
    removeCheckedAll(state){
      state.carts = state.carts.filter(item => !item.checked)
      state.checkAll = false
      localStorage.setItem("cart", JSON.stringify(state))
    },
    getCheckAll(state){
      state.carts = state.carts.map(item=>({...item, checked: !state.checkAll}))
      state.checkAll = !state.checkAll
      localStorage.setItem("cart", JSON.stringify(state))
    }
  },
});

export const { addItemCart, removeItemCart, clearCart, updateQuantity, updateCheckedItem, removeCheckedAll, addItemCartByAmount, getCheckAll } =
  cartSlice.actions;
export default cartSlice.reducer;
