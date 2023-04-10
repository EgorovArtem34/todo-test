import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice.js';
// import categoriesSlice from './categoriesSlice.js';
import modalsSlice from './modalsSlice.js';

export default configureStore({
  reducer: {
    tasksSlice,
    // categoriesSlice,
    modalsSlice,
  },
});
