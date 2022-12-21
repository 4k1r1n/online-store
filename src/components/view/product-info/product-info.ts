import createElement from '../../../utils/create-element';
import { Product } from '../../../types/types';

export default function productInfo(data: Product) {
  const info = createElement('div', 'product__info');
  const template = `<h2>${data.brand}</h2>
                    <h3>${data.category}</h3>
                    <h4>${data.category}</h4>
                    <h4>${data.description}</h4>
                    <b>$ ${data.price}</b>
                    <button class="btn">ADD TO CARD</button>
                    <button class="btn">BUY NOW</button>
                    `;
  info.innerHTML = template;
  return info;
}
