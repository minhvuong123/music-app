import { SONGS } from 'shared/redux/const';

export default function loadingReducer(state = false, action: any) {
  switch(action.type) {
    case SONGS.LOAD: 
      return true
    case SONGS.LOAD_SUCCESS: 
      return false
    default:
      return state;
  }
}