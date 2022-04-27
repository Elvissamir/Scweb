import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCurrency: '$'
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        changeCurrency: (state, action) => {
            state.activeCurrency = action.payload.currency
        }
    } 
})

export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer