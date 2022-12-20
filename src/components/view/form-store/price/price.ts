import createElement from '../../../../utils/create-element';
import { createRange } from '../../input/input';

export default function renderPriceRage() {
  const priceRange = createElement('section', 'price');
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Price');
  // add elements
  priceRange.appendChild(heading);
  priceRange.appendChild(createRange());
  return priceRange;
}
