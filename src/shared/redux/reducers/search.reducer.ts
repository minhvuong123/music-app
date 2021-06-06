import { SEARCH } from 'shared/redux/const';

export default function searchReducer(state = '', action: any) {
  switch(action.type) {
    case SEARCH.UPDATE: 
      state = action.value;
      return state
    default:
      return state;
  }
}