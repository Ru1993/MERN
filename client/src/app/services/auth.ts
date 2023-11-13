import { User } from '../../interface';
import { api } from './api';

export type UserData = Omit<User, '_id'>;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<ResponseLoginData, UserData>({
      query: userData => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    register: build.mutation<ResponseLoginData, UserData>({
      query: userData => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    current: build.query<ResponseLoginData, void>({
      query: data => ({
        url: '/current',
        method: 'GET',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
