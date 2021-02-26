import { takeEvery, put } from 'redux-saga/effects';

import { SONG } from 'shared/redux/const';
import { notifyError, setSongAction } from '../actions';


function* handleSongLoad({ song }: any): any {
  try {
    yield put(setSongAction(song));
  } catch (error) {
    yield put(notifyError());
  }
}

// watcher
function* watchSongLoad() {
  yield takeEvery(SONG.LOAD, handleSongLoad);
}

export default watchSongLoad;