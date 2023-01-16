import { localStorageKeys } from '../../constants/constants';

export default function clearAllFilters() {
  localStorage.removeItem(localStorageKeys.PRICE);
  localStorage.removeItem(localStorageKeys.STOCK);
  localStorage.removeItem(localStorageKeys.BRAND);
  localStorage.removeItem(localStorageKeys.CATEGORY);
  localStorage.removeItem(localStorageKeys.SORT);
  localStorage.removeItem(localStorageKeys.SEARCH);
  localStorage.removeItem(localStorageKeys.VIEW);
}
