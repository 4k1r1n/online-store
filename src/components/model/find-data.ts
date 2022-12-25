import data from '../../data/data';

export default function fidnDataById(value: number) {
  return data.find((el) => el.id === value);
}
