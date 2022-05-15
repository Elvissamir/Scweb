import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            console.log(action.payload)
            state.items.push(action.payload.item)
        },
        removeCartItem: (state, action) => {
            state.items.filter(item => action.payload.id !== item.id)
        },
        resetCart: () => initialState
    } 
})

export const { addCartItem, removeCartItem, resetCart } = cartSlice.actions

export default cartSlice.reducer