import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { loadState } from './storage';
import { PREFIX } from '../helpers/API';
import { ILoginResponse } from '../interfaces/auth.interface';
import { IProfile } from '../interfaces/user.interface';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface IUserPersistentState {
    jwt: string | null;
}

export interface IUserState {
    jwt: string | null;
    loginErroMessage?: string;
    registerErroMessage?: string;
    profile?: IProfile;
}

const initialState: IUserState = {
    jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk(
    'user/login',
    async (params: { email: string; password: string }) => {
        try {
            const { data } = await axios.post<ILoginResponse>(
                `${PREFIX}/auth/login`,
                {
                    email: params.email,
                    password: params.password
                }
            );

            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (params: { name: string; email: string; password: string }) => {
        try {
            const { data } = await axios.post<ILoginResponse>(
                `${PREFIX}/auth/register`,
                {
                    name: params.name,
                    email: params.email,
                    password: params.password
                }
            );

            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }
);

export const getProfile = createAsyncThunk<
    IProfile,
    void,
    { state: RootState }
>('user/profile', async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get(`${PREFIX}/user/profile`, {
        headers: { Authorization: `Bearer ${jwt}` }
    });
    return data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
            state.profile = undefined;
        },
        clearLoginError: (state) => {
            state.loginErroMessage = undefined;
        },
        clearRegisterError: (state) => {
            state.registerErroMessage = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.jwt = action.payload.access_token;
            }
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErroMessage = action.error.message;
        });

        builder.addCase(register.fulfilled, (state, action) => {
            if (action.payload) {
                state.jwt = action.payload.access_token;
            }
        });
        builder.addCase(register.rejected, (state, action) => {
            state.registerErroMessage = action.error.message;
        });

        builder.addCase(getProfile.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile = action.payload;
            }
        });
    }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
