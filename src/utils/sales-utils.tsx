import { filterOptions } from '../api/constants';
import { FilterPayload } from '../types';

export const getDefaultFilterOption = (filterPayload?: FilterPayload) => {
  console.log({ filterPayload: filterPayload });
  if (!filterPayload) {
    return [{ filterType: 'and', payload: [{}] }];
  }
  const filters = [];
  for (const iterator in filterPayload) {
    console.log('--->', { iterator });
    if (iterator === 'and' || iterator === 'or') {
      filters.push({ filterType: iterator, payload: filterPayload[iterator] });
    } else {
      filters.push({ filterType: 'and', payload: [filterPayload] });
    }
  }
  return filters;
};

export const getDefaultFilterValue = (type: string, filterPayload?: FilterPayload) => {
  const typeObj = filterPayload ? filterPayload[type] : {};
  let value = '';
  for (const key in typeObj) {
    if (Object.prototype.hasOwnProperty.call(typeObj, key)) {
      value = typeObj[key];
    }
  }
  return value;
};

export function getFilterOption(property: string) {
  return filterOptions.find((option) => option.id === property);
}
