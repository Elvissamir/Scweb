import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: '$'
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        changeCurrency: (state, action) => {
            state.currency = action.payload.currency
        }
    } 
})

export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer