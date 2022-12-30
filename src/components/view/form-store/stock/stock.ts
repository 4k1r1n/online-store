import createElement from '../../../../utils/create-element';
import { createRange } from '../../input/input';

export default function renderStockRage() {
  const stockRange = createElement('section', 'stock');
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Stock');
  // add elements
  stockRange.appendChild(heading);
  stockRange.appendChild(createRange());
  return stockRange;
}
