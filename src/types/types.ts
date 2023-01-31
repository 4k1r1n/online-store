export interface Product {
  [key: string]: string | number | string[];
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  capacity: number;
  images: Array<string>;
}

export interface Promo {
  name: string;
  discount: number;
}

export interface StateCartButtons {
  flag: boolean;
  btn: HTMLElement;
}

export interface StateCardButton extends StateCartButtons {
  id: number;
}

export interface LocalStorage {
  event: Event;
  key: string;
  query: Array<string>;
}
