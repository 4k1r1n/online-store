import createElement from '../../../utils/create-element';
import { Product } from '../../../types/types';
import { addToCartButton, buyNowButton } from '../button/button';
import { setStateProductBtn } from '../../model/product-details';
import { handleAddProductClick } from '../../controller/product-details';

export default function productInfo(data: Product) {
  const productInfo = createElement('div', 'product__info info');
  const infoContainer = createElement('div', 'info__container');
  const infoTitle = createElement('h2', 'info__title', `${data.title}`);
  const infoCategory = createElement('p', 'info__category', `${data.category}`);
  const infoBrand = createElement('p', 'info__brand', `${data.brand}`);
  const infoCapacity = createElement('p', 'info__capacity', `${data.capacity} ml`);
  const infoDesc = createElement('p', 'info__desc', `${data.description}`);
  const infoPrice = createElement('p', 'info__price', `$ ${data.price}`);
  const infoBtn = createElement('div', 'info__btn');
  const addProductBtn = addToCartButton();
  const buyProductBtn = buyNowButton();

  productInfo.append(infoContainer, infoBtn);
  infoContainer.append(infoTitle, infoCategory, infoBrand, infoDesc, infoCapacity, infoPrice);
  infoBtn.append(addProductBtn, buyProductBtn);

  let isClicked = false;
  addProductBtn.addEventListener('click', (e) => {
    isClicked = handleAddProductClick(isClicked, e);
  });

  isClicked = setStateProductBtn(isClicked, addProductBtn);

  return productInfo;
}
