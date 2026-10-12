export interface Ride {
  from: string;
  to: string;
  date: string;
  time: string;
  price?: string;
  seats?: string;
  earnings?: string;
  maxSeats?: number;
  passengers?: number;
  reviews?: number;
  description?: string;
}
