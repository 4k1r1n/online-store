export default function createElement(type: string, className?: string, value?: string | null): HTMLElement {
  const element = document.createElement(type);
  if (className) {
    element.className = className;
  }
  if (value) {
    element.textContent = value;
  }
  return element;
}
