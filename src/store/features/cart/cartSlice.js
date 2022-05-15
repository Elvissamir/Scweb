import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const cartItem = state.items.find(item => item.id === action.payload.item.id)

            if (!cartItem)
                state.items.push(action.payload.item)
            else 
                cartItem.count += 1
        },
        removeCartItem: (state, action) => {
            state.items.filter(item => action.payload.id !== item.id)
        },
        resetCart: () => initialState
    } 
})

export const { addCartItem, removeCartItem, resetCart } = cartSlice.actions

export default cartSlice.reducer