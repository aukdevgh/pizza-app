import { configureStore } from '@reduxjs/toolkit';
import { saveState } from './storage';
import userReducer, { JWT_PERSISTENT_STATE } from './user.slice';
import cartReducer, { CART_PERSISTENT_STATE } from './cart.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
});

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
    saveState({ items: store.getState().cart.items }, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
