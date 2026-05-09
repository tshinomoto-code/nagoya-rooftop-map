export type Area = "名駅" | "栄" | "金山" | "吹上" | "港" | "東山" | "その他";

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  body: string;
}

export interface Spot {
  id: string;
  name: string;
  area: Area;
  lat: number;
  lng: number;
  address: string;
  hours: string;
  closed: string;
  fee: string;
  description: string;
  tips: string;
  photos: string[];
  reviews: Review[];
}
