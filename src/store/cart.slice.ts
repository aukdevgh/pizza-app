import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface IItem {
    id: number;
    count: number;
}

export interface IItemsState {
    items: IItem[];
}

const initialState: IItemsState = {
    items: loadState<IItemsState>(CART_PERSISTENT_STATE)?.items ?? []
};

export const cartSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((i) => i.id === action.payload);

            if (!existed) {
                state.items.push({ id: action.payload, count: 1 });
                return;
            }

            state.items = state.items.map((i) => {
                if (i.id === action.payload) {
                    i.count += 1;
                }
                return i;
            });
        },

        remove: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(
                (item) => item.id === action.payload
            );

            if (!existed) {
                return;
            }

            if (existed.count === 1) {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
                return;
            }

            state.items = state.items.map((i) => {
                if (i.id === action.payload) {
                    i.count -= 1;
                }
                return i;
            });
        },

        delete: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        clean: (state) => {
            state.items = [];
        }
    }
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
