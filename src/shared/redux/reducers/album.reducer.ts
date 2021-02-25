import { ALBUM } from 'shared/redux/const';

export default function albumReducer(state = {}, action: any) {
  switch(action.type) {
    case ALBUM.LOAD_SUCCESS: 
      return {...state, ...action.album}
    default:
      return state;
  }
}