import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../store/slices/authSlice"
import projectReducer from "../store/slices/projectSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    projects:projectReducer
  },
});

export default store;