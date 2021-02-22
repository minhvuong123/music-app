import { combineReducers } from 'redux';

import songsReducer from './songs.reducer';
import loadingReducer from './loading.reducer';
import errorReducer from './error.reducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  songs: songsReducer,
  error: errorReducer
});

export default  rootReducer;