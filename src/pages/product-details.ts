import createElement from '../utils/create-element';
import productImg from '../components/view/product-img/product-img';
import productInfo from '../components/view/product-info/product-info';
import { Product } from '../types/types';
import fidnDataById from '../components/model/find-data';

export default function getProduct(id: number) {
  const object = fidnDataById(id) as Product;
  const product = createElement('div', 'product wrapper');
  product.append(productImg(object.images));
  product.append(productInfo(object));
  return product;
}
