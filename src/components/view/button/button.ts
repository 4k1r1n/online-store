import createElement from '../../../utils/create-element';

export function resetStoreButton(): HTMLElement {
  return createElement('button', 'btn form-store__btn form-store__btn_reset', 'RESET');
}

export function copyStoreButton(): HTMLElement {
  return createElement('button', 'btn form-store__btn form-store__btn_copy', 'COPY LINK');
}
