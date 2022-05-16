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
            const index = state.items.findIndex(item => isSameItem(item, payload.item))
            const cartItem = state.items[index]

            if (cartItem.count > 0)
                cartItem.count -= 1

            if (cartItem.count === 0)
                state.items.splice(index, 1)
        },
        resetCart: () => initialState
    } 
})

export const { addCartItem, editCartItemOption, removeCartItem, resetCart } = cartSlice.actions

export default cartSlice.reducer