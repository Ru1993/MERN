export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdEmployee: string[];
}

export interface InitialState {
  user: (User & { token: string }) | null;
  isAuthenticated: boolean;
}

export interface Cars {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface CarsCatalog {
  cars: Cars[] | null;
}
