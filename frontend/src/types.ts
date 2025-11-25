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
export interface IAccount {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  role: "user" | "admin";
  isBlocked: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IShowMessage {
  type: "success" | "error";
  text: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  payload: string;
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
  countryName: string;
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
export interface Item {
  label: string;
  to: string;
  icon: React.ReactNode;
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
  onDelete: (id: string) => void;
}
export interface IStats {
  cities: number;
  countries: number;
  admins: number;
  users: number;
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
export interface ImageCarouselProps {
  images: string[];
  title?: string;
  isAdmin?: boolean;
  onDeleteImage?: (filename: string) => void;
}

export interface ISidebarProps {
  item: Item;
  onClick?: () => void;
}

export interface Country {
  _id: string;
  name: string;
  description: string;
  images: string[];
  cities: ICity[];
}
