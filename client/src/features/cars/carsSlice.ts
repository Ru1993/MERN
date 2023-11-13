import { createSlice } from '@reduxjs/toolkit';
import { CarsCatalog } from '../../interface';
import { authCars } from '../../app/services/cars';
import { RootState } from '../../app/store';

const initialState: CarsCatalog = {
  cars: null,
};

const slice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: build => {
    build.addMatcher(
      authCars.endpoints.getAllCars.matchFulfilled,
      (state, action) => {
        state.cars = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const selectorCars = (state: RootState) => state.car.cars;
