import { createBrowserRouter } from 'react-router-dom';
import { Paths } from './paths';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import CarsCatalog from './pages/carsCatalog/CarsCatalog';
import CarAdd from './pages/carAdd/CarAdd';
import Status from './pages/status/Status';
import CarDetail from './pages/carDetail/CarDetail';
import CarUpdated from './pages/carUpdated/CarUpdated';

export const router = createBrowserRouter([
  {
    path: Paths.carsCatalog,
    element: <CarsCatalog />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.carAdd,
    element: <CarAdd />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.cars}/:id`,
    element: <CarDetail />,
  },
  {
    path: `${Paths.carUpdated}/:id`,
    element: <CarUpdated />,
  },
]);
