import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import categoryReducer from './features/category/categorySlice'
import currencyReducer from './features/currency/currencySlice'
import modalReducer from './features/modal/modalSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        currency: currencyReducer,
        category: categoryReducer,
        modal: modalReducer
    }
})

export default store