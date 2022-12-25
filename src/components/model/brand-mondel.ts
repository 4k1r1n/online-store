import data from '../../data/data';

export default function getBrand() {
  const array = Array.from(new Set(data.map((el) => el.brand)));
  const obj = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j].brand === array[i]) {
        obj.push(data[j]);
        break;
      }
    }
  }
  return obj;
}
