import createElement from '../../../utils/create-element';

export default function createCheckbox() {
  const checkbox = createElement('input', 'checkbox');
  const label = createElement('label', 'form__label', 'value-change?');
  checkbox.setAttribute('type', 'checkbox');
  label.prepend(checkbox);
  return label;
}

export function createRange() {
  const range = createElement('input', 'range');
  range.setAttribute('type', 'range');
  return range;
}
