import createElement from '../../../utils/create-element';
import { handleQuerySearch } from '../../controller/main-page';
import changeView from '../cards-view/cards-view';

export default function cardsArrButton(view = 'columns') {
  const btn = createElement('button', 'btn btn__view');
  btn.setAttribute('data-id', view);
  const className = view === 'columns' ? 'btn__view_columns' : 'btn__view_list';
  btn.classList.add(className);
  btn.addEventListener('click', (e) => {
    changeView();
    const event = e.target as HTMLElement;
    if (event.getAttribute('data-id') === 'columns') {
      localStorage.setItem('view', 'list');
      event.setAttribute('data-id', 'list');
      btn.classList.remove('btn__view_columns');
      btn.classList.add('btn__view_list');
    } else {
      localStorage.setItem('view', 'columns');
      event.setAttribute('data-id', 'columns');
      btn.classList.remove('btn__view_list');
      btn.classList.add('btn__view_columns');
    }
    handleQuerySearch();
  });
  return btn;
}
