import { SEARCH } from 'shared/redux/const';

export function updateSearchAction(item: any) {
  return {
    type: SEARCH.UPDATE,
    item
  }
} 