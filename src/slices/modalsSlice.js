/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload;
    },
    closeModal: (state) => {
      state.type = null;
    },
  },
});

export const { showModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
