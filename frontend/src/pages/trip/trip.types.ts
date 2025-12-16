export interface IActivity {
  id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lon: number | null;
  stars?: number | null;
  rooms?: number | null;
  phone: string[];
  email: string | null;
  website: string | null;
  image?: string | null;
  images?: string[];
  wikidata: string | null;
  type?: string | null;
  cuisine?: string[];
  openingHours?: string | null;
}

export interface IHotel {
  id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lon: number | null;
  phone: string[] | null;
  email: string | null;
  website: string | null;
  rooms: number | null;
  stars: number | null;
  image: string | null;
  wikidata: string | null;
}

export interface ITripDayPlan {
  order: number;
  cityId: string;
  hotelId: string | null;
  dayActivities: IActivity[];
  nightActivities: IActivity[];
}

export interface TripState {
  tripId?: string;
  countryId?: string;
  cityId?: string;
  startDate?: string;
  endDate?: string;
  hotelId?: string | null;
  days: ITripDayPlan[];
  title: string;
  description: string;
}

export interface TripContextValue {
  state: TripState;

  setCountry(id: string): void;
  setCity(id: string): void;
  setDates(start: string, end: string): void;
  setHotel(id: string | null): void;

  createTrip(): Promise<any>;
  createTripDay(plan: ITripDayPlan): Promise<any>;
  addDayActivity(dayId: string, a: IActivity): Promise<void>;
  addNightActivity(dayId: string, a: IActivity): Promise<void>;
}

export interface HotelSectionProps {
  hotels: any[];
  selectedHotel: any | null;
  hotelSearch: string;
  minStars: number;
  onHotelSearch: (value: string) => void;
  onMinStarsChange: (value: number) => void;
  onHotelSelect: (id: string | null) => void;
  loading: boolean;
}

export interface ActivityGridProps {
  activities: IActivity[];
  selectedActivities: IActivity[];
  onToggle: (activity: IActivity) => void;
}

export interface DayActionsProps {
  canCopyFromPrevious: boolean;
  onCopyFromPrevious: () => void;
  saving: boolean;
  hasCity: boolean;
  onSave: () => void;
  onSkipAll: () => void;
}

export interface ITripDayLocal {
  day: number;
  date: string;
  cityId: string | null;
  hotelId: string | null;
  tripDayId: string | null;
  dayActivities: IActivity[];
  nightActivities: IActivity[];
  cafes: IActivity[];
}
