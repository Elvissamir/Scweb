import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        categories: categoriesReducer
    }
})

export default store