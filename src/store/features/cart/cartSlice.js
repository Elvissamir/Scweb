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
        editCartItemOption: (state, action) => {
            console.log('edit cart item option')
            console.log(action.payload.item)
            console.log(action.payload.selection)

            const cartItem = state.items.find(item => {
                if (item.id !== action.payload.item.id)
                    return false
                
                for (let attribute of item.options) {
                    if (!action.payload.options[attribute] || action.payload.options[attribute] !== item.options[attribute]) {
                        return false
                    }
                }

                return true
            })

            console.log(cartItem)
        },
        removeCartItem: (state, action) => {
            state.items.filter(item => action.payload.id !== item.id)
        },
        resetCart: () => initialState
    } 
})

export const { addCartItem, editCartItemOption, removeCartItem, resetCart } = cartSlice.actions

export default cartSlice.reducer