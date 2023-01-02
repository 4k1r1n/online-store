import createElement from '../../../utils/create-element';

export default function renderFooter() {
  const footer = createElement('footer', 'footer');
  const footerWrapper = createElement('div', 'footer__wrapper wrapper');

  const authors = createElement('div', 'footer__authors');
  const author1 = createElement('a', 'author', 'matthewTheWizzard');
  const author2 = createElement('a', 'author', '4k1r1n');
  author1.setAttribute('href', 'https://github.com/matthewTheWizzard');
  author1.setAttribute('target', '_blank');
  author2.setAttribute('href', 'https://github.com/4k1r1n');
  author2.setAttribute('target', '_blank');

  const copyright = createElement('div', 'footer__copyright copyright');
  const year = createElement('span', 'copyright__year', '© 2022');
  const rs = createElement('a', 'copyright__link');
  const rsIcon = createElement('span', 'ico ico_rs');
  rs.setAttribute('href', 'https://rs.school/js/');
  rs.setAttribute('target', '_blank');

  footer.append(footerWrapper);
  footerWrapper.append(authors, copyright);
  authors.append(author1, ' & ', author2);
  copyright.append(rs, year);
  rs.append(rsIcon);

  return footer;
}
