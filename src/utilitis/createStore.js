import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../utilitis/cartSlice'

const createStore = configureStore({
    reducer: {
        cartItems: cartReducer
    }
})

export default  createStore;