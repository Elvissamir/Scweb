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
        editCartItemOption: (state, { payload }) => {
            const cartItem = state.items.find(item => {
                if (item.id !== payload.item.id)
                    return false
                
                for (let attribute in item.options) {
                    if (!payload.item.options[attribute] || payload.item.options[attribute] !== item.options[attribute]) {
                        return false
                    }
                }

                return true
            })

            cartItem.options[payload.selection.attribute] = payload.selection.value
        },
        removeCartItem: (state, action) => {
            state.items.filter(item => action.payload.id !== item.id)
        },
        resetCart: () => initialState
    } 
})

export const { addCartItem, editCartItemOption, removeCartItem, resetCart } = cartSlice.actions

export default cartSlice.reducer