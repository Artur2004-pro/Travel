export interface INewUser {
  email: string;
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
}

// export interface IAccount {
//   _id: string;
//   email: string;
//   username: string;
//   role: string;
//   updatedAt: string;
//   createdAt: string;
// }

export interface IAccount {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
  emailVerified: boolean;
  emailVerifyExpires: string;
  emailVerifyToken: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ILoginUser {
  username: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
}

export interface IResponse<T = unknown> {
  status: string;
  message: string;
  payload: T;
}

export interface INewCountry {
  name: string;
  description: string;
  images: string[];
}

export interface INewCity {
  name: string;
  description: string;
  images: string[];
}

export interface ICity {
  name: string;
  description: string;
  images: string[];
  countryId: string;
  top: number;
  _id: string;
}

export interface ICountry {
  name: string;
  _id: string;
  description: string;
  images: string[];
}

export interface IOutletContext {
  account: IAccount;
}

// props

export interface IAccountProps {
  account: IAccount;
}

export interface ICountryProps {
  country: ICountry;
  onDelete: (id: string) => void;
}

export interface ICityProps {
  city: ICity;
}

export interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface IDeleteButtonProps {
  onClick: (id: string) => void;
  id: string;
}

export interface ImageSectionProps {
  images: string[];
}