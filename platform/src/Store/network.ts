import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocationMaterialCategory, LocationMaterialKpiEvents, Notification } from '@Models';
import type { RootState } from './store';

const baseApiAddress = process.env.REACT_APP_BASE_API_ADDRESS
  ? process.env.REACT_APP_BASE_API_ADDRESS
  : 'http://localhost:3001/';
export const networkApi = createApi({
  reducerPath: 'networkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiAddress,

    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState;
      const { token } = auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLocationMaterialCategories: builder.query<LocationMaterialCategory[], undefined>({
      query: () => `locationMaterialCategories`,
    }),
    getLocationMaterials: builder.query<LocationMaterialKpiEvents[], undefined>({
      query: () => `locationMaterials`,
    }),
    getNotifications: builder.query<Notification[], undefined>({
      query: () => `notifications`,
    }),
    getLocations: builder.query<object, undefined>({
      query: () => `locations`,
    }),
    getMaterials: builder.query<object, undefined>({
      query: () => `materials`,
    }),
  }),
});

export const {
  useGetLocationMaterialCategoriesQuery,
  useGetLocationMaterialsQuery,
  useGetNotificationsQuery,
  useGetLocationsQuery,
  useGetMaterialsQuery,
} = networkApi;
