export default function clearAllFilters() {
  localStorage.removeItem('price');
  localStorage.removeItem('stock');
  localStorage.removeItem('brand');
  localStorage.removeItem('category');
  localStorage.removeItem('sort');
  localStorage.removeItem('search');
}
