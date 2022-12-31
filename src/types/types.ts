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
  images: string[];
}
