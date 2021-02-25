import { takeEvery, call, put } from 'redux-saga/effects';

import { ALBUM } from 'shared/redux/const';
import { 
  setAlbumAction,
  setSongsAction
} from '../actions';
import { getAlbumApi, getSongsApi } from 'shared/api';
import { notifyError } from '../actions/error.action';


function* handleAlbumLoad({ name }: any) {
  try {
    const album = yield call(getAlbumApi, name);
    yield put(setAlbumAction(album));

    const songs = yield call(getSongsApi, album._id);
    yield put(setSongsAction(songs));
  } catch (error) {
    yield put(notifyError());
  }
}

// watcher
function* watchAlbumLoad() {
  yield takeEvery(ALBUM.LOAD, handleAlbumLoad);
}

export default watchAlbumLoad;