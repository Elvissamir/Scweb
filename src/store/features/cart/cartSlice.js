import { createSlice } from "@reduxjs/toolkit";
import isSameItem from '../../../utils/isSameItem';

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, { payload }) => {
            const cartItem = state.items.find(item => isSameItem(item, payload.item))

            if (!cartItem)
                state.items.push(payload.item)
            else 
                cartItem.count += 1
        },
        editCartItemOption: (state, { payload }) => {
            const cartItem = state.items.find(item => isSameItem(item, payload.item))
            
            cartItem.options[payload.selection.attribute] = payload.selection.value
        },
        removeCartItem: (state, { payload }) => {
            // 
        },
        resetCart: () => initialState
    } 
})

export const { addCartItem, editCartItemOption, removeCartItem, resetCart } = cartSlice.actions

export default cartSlice.reducer