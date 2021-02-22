import { SONGS } from 'shared/redux/const';

export default function songsReducer(state = [], action: any) {
  switch(action.type) {
    case SONGS.LOAD_SUCCESS: 
      return [...state, ...action.songs]
    default:
      return state;
  }
}