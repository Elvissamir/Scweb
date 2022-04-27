import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 'all'
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            console.log(action.payload)
            state.activeCategory = action.payload.category
        },
    }
})

export const { changeCategory } = categorySlice.actions

export default categorySlice.reducer