import createElement from '../../../utils/create-element';
import { handleCartClick, setStateCardButtons } from '../../controller/main-page';

export function createCard(img: string, name: string, price: string | number, id: number): HTMLElement {
  const card = createElement('div', 'card');
  const cardImage: HTMLElement = createElement('img', 'card__img');
  if (cardImage instanceof HTMLImageElement) {
    cardImage.src = img;
    cardImage.setAttribute('data-id', id.toString());
  }
  const cardName = createElement('span', 'card__name', name);
  const cardPrice = createElement('span', 'card__price', '$ ' + price);
  const cardButton = createElement('button', 'btn btn_product-add');
  const cardInfo = createElement('div', 'card__info');
  const cardFooter = createElement('div', 'card__footer');

  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardPrice);
  cardFooter.appendChild(cardInfo);
  cardFooter.appendChild(cardButton);
  card.appendChild(cardImage);
  card.appendChild(cardFooter);

  const cardId = Number(cardImage.getAttribute('data-id'));
  let isClicked = false;
  cardButton.addEventListener('click', (e) => (isClicked = handleCartClick(isClicked, cardId, e)));
  isClicked = setStateCardButtons(isClicked, cardButton, cardId);

  return card;
}
