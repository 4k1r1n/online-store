import createElement from '../../../utils/create-element';
import imagesLayout from './images-layout';

export default function productImg() {
  const images = createElement('div', 'product__images');
  images.append(imagesLayout(['1', '2', '3'])); // change to data
  return images;
}
