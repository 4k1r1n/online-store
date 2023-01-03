import createElement from '../../../utils/create-element';
import { Product } from '../../../types/types';
import { addToCartButton, buyNowButton } from '../button/button';
import { handleAddProductClick, setStateProductBtn } from '../../controller/main-page';

export default function productInfo(data: Product) {
  const productInfo = createElement('div', 'product__info info');
  const infoTitle = createElement('h3', 'info__title', `${data.title}`);
  const infoCategory = createElement('p', 'info__category', `${data.category}`);
  const infoBrand = createElement('p', 'info__brand', `${data.brand}`);
  const infoDesc = createElement('p', 'info__desc', `${data.description}`);
  const infoPrice = createElement('p', 'info__price', `$ ${data.price}`);
  const infoBtn = createElement('div', 'info__btn');
  const addProductBtn = addToCartButton();
  const buyProductBtn = buyNowButton();

  productInfo.append(infoTitle, infoCategory, infoBrand, infoDesc, infoPrice, infoBtn);
  infoBtn.append(addProductBtn, buyProductBtn);

  let isClicked = false;
  addProductBtn.addEventListener('click', (e) => (isClicked = handleAddProductClick(isClicked, e)));
  isClicked = setStateProductBtn(isClicked, addProductBtn);

  return productInfo;
}
