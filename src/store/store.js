import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import categoryReducer from './features/category/categorySlice'
import currencyReducer from './features/currency/currencySlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        currency: currencyReducer,
        category: categoryReducer
    }
})

export default store