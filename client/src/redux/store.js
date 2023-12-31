
import { configureStore } from '@reduxjs/toolkit'
import userSlice, { logout } from './slice/userSlice'
import cartSlice from './slice/cartSlice'


export const store = configureStore({
    reducer: {
        "user": userSlice,
        "cart_items" : cartSlice,
    },
})