import createElement from '../utils/create-element';

export default function getError() {
  const error = createElement('h2', 'error wrapper', '404 page no found');
  return error;
}
