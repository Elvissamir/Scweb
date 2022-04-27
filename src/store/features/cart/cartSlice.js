import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: []
    },
    reducers: {
        addCartProduct: (state, action) => {
            // add product
        },
        removeCartProduct: (state, action) => {
            // remove product
        },
        resetCart: (state, action) => {
            // reset
        }
    } 
})

export const { addCartProduct, removeCartProduct, resetCart } = cartSlice.actions

export default cartSlice.reducer