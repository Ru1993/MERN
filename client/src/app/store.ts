import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import aut from '../features/auth/authSlice';
import car from '../features/cars/carsSlice';
import { api } from './services/api';
import { listenerMiddleware } from '../middleware/middlewareAuth';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    aut,
    car,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
