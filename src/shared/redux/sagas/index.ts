import { all } from 'redux-saga/effects';
import watchAlbumLoad from './album.saga';
import watchSongLoad from './song.saga';

// watcher sage -> actions -> worker saga

export default function* rootSaga() {
  yield all([
    watchAlbumLoad(),
    watchSongLoad()
  ]);
}