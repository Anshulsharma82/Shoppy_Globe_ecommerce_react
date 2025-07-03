import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalItems: 0,
        totalPrize: 0
    },
    reducers: {
        // function to add item to the cart
        addItem: (state,action) => {
            // check if item exist in the cart
            const isIdExist = state.cartItems.find((item) => item.id === action.payload.id)
            // if item is not in the cart push the item to the cart
            if(!isIdExist) {
                state.cartItems.push(action.payload)
            }
            // if item is present in the cart increase the quantity of the item 
            else {
                state.cartItems.map((item) => {
                    if(item.id === action.payload.id) {
                        item.orderedItemCount = item.orderedItemCount + action.payload.orderedItemCount
                        return item;
                    }
                    else {
                        return item;
                    }
                })
            }
            const response = state.cartItems.reduce((acc,cur) => {
                acc.totalItems = acc.totalItems + cur.orderedItemCount;
                acc.totalPrize = acc.totalPrize + (cur.orderedItemCount * cur.priceAfterDiscount)
                return acc;
            }, {totalItems: 0, totalPrize: 0})
            state.totalItems = response.totalItems;
            state.totalPrize = response.totalPrize;
        },
        // function to increase the quantity of item in the cart by 1
        increaseItemQuantity: (state,action) => {
            state.cartItems.map((item) => {
                if(item.id === action.payload.id) {
                    item.orderedItemCount = item.orderedItemCount + 1;
                    state.totalItems = state.totalItems + 1;
                    state.totalPrize = state.totalPrize + item.priceAfterDiscount
                }
                return item;
            })
        },
        // function to decrease the quantity of item in the cart by 1
        decreaseItemQuantity: (state,action) => {
            state.cartItems.map((item) => {
                if(item.id === action.payload.id) {
                    item.orderedItemCount -= 1
                    state.totalPrize = state.totalPrize - item.priceAfterDiscount
                    state.totalItems = state.totalItems - 1;
                }
                return item;
            })
        },
        // function to remove the item from the cart.
        removeItem: (state,action) => {
            const res = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = res;
            const response = state.cartItems.reduce((acc,cur) => {
                acc.totalItems = acc.totalItems + cur.orderedItemCount;
                acc.totalPrize = acc.totalPrize + (cur.orderedItemCount * cur.priceAfterDiscount)
                return acc;
            }, {totalItems: 0, totalPrize: 0})
            state.totalItems = response.totalItems;
            state.totalPrize = response.totalPrize;
        },
        clearCart: (state,action) => {
            state.cartItems = []
            state.totalItems = 0
            state.totalPrize = 0;
        }
    }
})

export default cartSlice.reducer;

export const { addItem, increaseItemQuantity, decreaseItemQuantity, removeItem, totalItems, totalPrize, clearCart } = cartSlice.actions