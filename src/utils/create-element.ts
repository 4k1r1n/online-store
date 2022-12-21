export default function createElement(type: string, className?: string, value?: string | number): HTMLElement {
  const element: HTMLElement = document.createElement(type);
  if (className) {
    element.className = className;
  }
  if (value) {
    typeof value === 'string' ? (element.textContent = value) : (element.textContent = value.toString());
  }
  return element;
}
