import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 'all'
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCurrency: (state, action) => {
            state.category = action.payload.category
        },
    }
})

export const { changeCurrency } = categorySlice.actions

export default categorySlice.reducer