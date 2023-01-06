import createElement from '../../../utils/create-element';

const smallImagesLayout = (paths: string[]) => {
  const layout = createElement('div', 'product__small-images-layout');
  for (let i = 0; i < paths.length; i++) {
    const image = createElement('img', 'product__small-image');
    image.setAttribute('src', paths[i]);
    layout.appendChild(image);
  }
  layout.addEventListener('click', (e) => {
    const event = e.target as HTMLElement;
    const smallPictureSrc = event.getAttribute('src') as string;
    const mainImage = event.parentElement?.nextElementSibling as HTMLElement;
    mainImage.setAttribute('src', smallPictureSrc);
  });
  return layout;
};

const mainImage = (path: string) => {
  const image = createElement('img', 'product__main-image');
  image.setAttribute('src', path);
  return image;
};

export default function imagesLayout(paths: string[]) {
  const layout = createElement('div', 'product__images-layout');
  layout.append(smallImagesLayout(paths));
  layout.append(mainImage(paths[0]));
  return layout;
}
