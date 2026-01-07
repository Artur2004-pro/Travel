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

export interface ICountryView {
  name: string;
  description: string;
  images: string[];
  cities: ICity[];
  _id: string;
  top: number;
}

export interface IOutletContext {
  account: IAccount;
}
export interface Item {
  label: string;
  to: string;
  icon: React.ReactNode;
  children?: Item[];
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

export interface ITripItem {
  country: boolean;
  planning: boolean;
  dayPlanning: boolean;
  finish: boolean;
}

export interface TripItem {
  to: string;
  icon: React.ReactNode | string;
  label: string;
  key: string;
}

export interface ICountryCardProps {
  country: Country;
  next(id: string): void;
}

export interface IBudget {
  planned: number;
  spent: number;
  currency: string;
}

export interface ITrip {
  _id: string;
  title: string;
  description: string;
  country: string; // կամ եթե ունես Country type, կարող ես այն էլ օգտագործել
  startDate: string; // կամ Date, եթե ուզում ես ավտոմատ Date դարձնել
  endDate: string;
  days: any[]; // Կարող ես ավելի ճշգրիտ type սարքել, եթե գիտես day-ի կառուցվածքը
  isPrivate: boolean;
  budget: IBudget;
  user: string; // կամ IUser, եթե ունես user type
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITripDayState {
  day: number;
  cityId: string;
  hotelId?: string;
  dayActivities: IActivity[];
  nightActivities: IActivity[];
}

export interface IActivity {
  id: string;
  name: string;
  address: string;

  lat: number;
  lon: number;

  stars: number;

  phone: string[];
  email: string | null;
  website: string;

  image: string | null;
  images: string[];

  rooms: number | null;

  wikidata: string;
}
