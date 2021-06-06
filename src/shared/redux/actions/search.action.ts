import { SEARCH } from 'shared/redux/const';

export function updateSearchAction(value: string) {
  return {
    type: SEARCH.UPDATE,
    value
  }
} 