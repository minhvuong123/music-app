import { SONGS, ERROR, ALBUM } from 'shared/redux/const';

export default function errorReducer(state = null, action: any) {
  switch(action.type) {
    case ERROR: 
      return true
    case SONGS.LOAD: 
    case SONGS.LOAD_SUCCESS: 
    case ALBUM.LOAD:
    case ALBUM.LOAD_SUCCESS:
      return false
    default:
      return state;
  }
}