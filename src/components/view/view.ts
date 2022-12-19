/* eslint-disable prettier/prettier */
import renderFooter from './footer/footer';
import renderHeader from './header/header';

const renderVew = () => {
  const body = document.body;
  body.prepend(renderHeader());
  body.appendChild(renderFooter());
  return body;
};

renderVew();
