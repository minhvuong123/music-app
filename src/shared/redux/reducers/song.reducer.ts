import { SONG } from 'shared/redux/const';

export default function songReducer(state = {}, action: any) {
  switch(action.type) {
    case SONG.LOAD_SUCCESS: 
      return {...state, ...action.song}
    default:
      return state;
  }
}