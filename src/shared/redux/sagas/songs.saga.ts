import { takeEvery, call, put } from 'redux-saga/effects';

import { SONGS } from 'shared/redux/const';
import { notifyError, setSongsAction } from '../actions';
import { getSongsApi } from 'shared/api';


function* handleSongsLoad(): any {
  try {
    const songs = yield call(getSongsApi, '603279f28299870ff4bcd376');
    yield put(setSongsAction(songs));
  } catch (error) {
    yield put(notifyError());
  }
}

// watcher
function* watchSongsLoad() {
  yield takeEvery(SONGS.LOAD, handleSongsLoad);
}

export default watchSongsLoad;