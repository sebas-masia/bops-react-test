import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@Models';
import { getValidToken, clearToken, saveToken } from '../../authentication';

const baseApiAddress = process.env.REACT_APP_BASE_API_ADDRESS;

export const AuthorizationSliceName = 'authApi';

export const authApi = createApi({
  reducerPath: AuthorizationSliceName,
  baseQuery: fetchBaseQuery({ baseUrl: baseApiAddress }),
  endpoints: (builder) => ({
    login: builder.mutation<Partial<User>, Partial<User>>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
        validateStatus: (response, result) => !!(response.status === 200 && result.token),
      }),
    }),
  }),
});

export const slice = createSlice({
  name: 'auth',
  initialState: {
    token: getValidToken(),
  },
  reducers: {
    logout(state) {
      clearToken();
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      const token = action.payload.token || '';
      saveToken(token);
      state.token = token;
    });
  },
});

export const { logout } = slice.actions;

export const { useLoginMutation } = authApi;
