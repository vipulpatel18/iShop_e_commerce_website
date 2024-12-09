import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './reducers/adminSlice';
import cartSlice from './reducers/cartSlice';
import userSlice from './reducers/userSlice';


export const store = configureStore({
  reducer: {
    admin : adminSlice,
    cart : cartSlice,
    user : userSlice,
  },
})