import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});