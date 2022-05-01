import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeModal: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        activeModal: (state, action) => {
            state.activeModal = action.payload.active
        }
    } 
})

export const { activeModal } = modalSlice.actions

export default modalSlice.reducer