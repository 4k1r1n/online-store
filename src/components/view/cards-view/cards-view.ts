export default function changeView() {
  const container = document.querySelector('.cards.layout-3-column') as HTMLElement;
  const btn = document.querySelector('.btn__view') as HTMLElement;
  const id = btn.getAttribute('data-id');
  if (id) {
    if (id === 'columns') {
      container.classList.add('cards_list');
    } else if (id === 'list') {
      container.classList.remove('cards_list');
    }
  }
}
