import { combineReducers } from 'redux';

import songsReducer from './songs.reducer';
import loadingReducer from './loading.reducer';
import errorReducer from './error.reducer';
import albumReducer from './album.reducer';
import songReducer from './song.reducer';
import playReducer from './play.reducer';
import statusReducer from './status.reducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  songs: songsReducer,
  album: albumReducer,
  error: errorReducer,
  song: songReducer,
  play: playReducer,
  status: statusReducer
});

export default  rootReducer;