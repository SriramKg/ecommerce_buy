import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import wishReducer from './wishSlice'

export const store = configureStore({
  reducer: {
    cart : cartReducer,
    wish : wishReducer,
  },
})