import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
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
        },
        // function to increase the quantity of item in the cart by 1
        increaseItemQuantity: (state,action) => {
            console.log('payload:::::::::', action.payload)
            state.cartItems.map((item) => {
                if(item.id === action.payload.id) {
                    console.log('yes:::::::::::::', item.id)
                    item.orderedItemCount = item.orderedItemCount + 1;
                }
                return item;
            })
        },
        // function to decrease the quantity of item in the cart by 1
        decreaseItemQuantity: (state,action) => {
            state.cartItems.map((item) => {
                if(item.id === action.payload.id) {
                    item.orderedItemCount -= 1
                }
                return item;
            })
        },
        // function to remove the item from the cart.
        removeItem: (state,action) => {
            console.log('removeItem called!!!')
            const res = state.cartItems.filter((item) => item.id !== action.payload.id)
            console.log('res::::::::', res)
            state.cartItems = res;
        }
    }
})

export default cartSlice.reducer;

export const { addItem, increaseItemQuantity, decreaseItemQuantity, removeItem } = cartSlice.actions