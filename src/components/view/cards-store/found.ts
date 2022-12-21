import createElement from '../../../utils/create-element';

export default function storeFound(value: string) {
  const found = createElement('span', 'menu__found', `Found ${value}`);
  return found;
}
