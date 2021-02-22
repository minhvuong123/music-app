import { SONGS } from 'shared/redux/const';

export default function errorReducer(state = null, action: any) {
  switch(action.type) {
    case SONGS.LOAD_FAIL: 
      return action.error
    case SONGS.LOAD: 
    case SONGS.LOAD_SUCCESS: 
      return null
    default:
      return state;
  }
}