import createElement from '../utils/create-element';
import productImg from '../components/view/product-img/product-img';
import productInfo from '../components/view/product-info/product-info';
import data from '../data/data'; // temporary

export default function getProduct() {
  const product = createElement('div', 'product');
  product.append(productImg());
  product.append(productInfo(data[0]));
  return product;
}
