import { SEARCH } from 'shared/redux/const';

export default function searchReducer(state = { stringText: '', songs: 0, albums: 0, singers: 0 }, action: any) {
  switch(action.type) {
    case SEARCH.UPDATE: 
      state.stringText = action.item.stringText;
      state.songs = action.item.songs;
      state.albums = action.item.albums;
      state.singers = action.item.singers;
      return state
    default:
      return state;
  }
}