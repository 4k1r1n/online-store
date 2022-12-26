import { Product } from '../../../types/types';
import createElement from '../../../utils/create-element';
import imagesLayout from './images-layout';

export default function productImg(data: Product['images']) {
  const images = createElement('div', 'product__images');
  images.append(imagesLayout(data));
  return images;
}
