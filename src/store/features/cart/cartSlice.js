import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartProduct: (state, action) => {
            state.products.push(action.payload.product)
        },
        removeCartProduct: (state, action) => {
            state.products.filter(product => action.payload.id !== product.id)
        },
        resetCart: () => initialState
    } 
})

export const { addCartProduct, removeCartProduct, resetCart } = cartSlice.actions

export default cartSlice.reducer