import { Cars } from '../../interface';
import { api } from './api';

export const authCars = api.injectEndpoints({
  endpoints: build => ({
    getAllCars: build.query<Cars[], void>({
      query: () => ({
        url: '/cars',
        method: 'GET',
      }),
    }),
    getCar: build.query<Cars, string>({
      query: id => ({
        url: `/cars/${id}`,
        method: 'GET',
      }),
    }),
    updatedCar: build.mutation<string, Cars>({
      query: cars => ({
        url: `/cars/updated/${cars._id}`,
        method: 'PUT',
        body: cars,
      }),
    }),
    deleteCar: build.mutation<string, string>({
      query: id => ({
        url: `/cars/delete/${id}`,
        method: 'DELETE',
        body: { id },
      }),
    }),
    addCar: build.mutation<Cars, Cars>({
      query: car => ({
        url: `/cars/add`,
        method: 'POST',
        body: car,
      }),
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetCarQuery,
  useUpdatedCarMutation,
  useDeleteCarMutation,
  useAddCarMutation,
} = authCars;

export const {
  endpoints: { getAllCars, getCar, updatedCar, deleteCar, addCar },
} = authCars;
