import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeModal: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        activateModal: (state, action) => {
            state.activeModal = action.payload.active
        }
    } 
})

export const { activateModal } = modalSlice.actions

export default modalSlice.reducer