import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userDetails: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
