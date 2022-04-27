import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 'all'
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.activeCategory = action.payload.category
        },
    }
})

export const { changeCategory } = categorySlice.actions

export default categorySlice.reducer