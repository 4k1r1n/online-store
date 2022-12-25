export default function renderHeader() {
  const header = document.createElement('header');
  header.innerHTML = `<a href="/" onclick="handleChangeRoute()">Logo</a>
  <a href="/cart" onclick="handleChangeRoute()">Cart</a>
  `;
  return header;
}
