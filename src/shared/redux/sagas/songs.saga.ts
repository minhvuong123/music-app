import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { SONGS } from 'shared/redux/const';
import { apiLink } from 'shared/const';
import { setError, setSongs } from '../actions';

async function fetchSongs(idAlbum: string) {;
  const response = await axios.get(`${apiLink}/songs/${idAlbum}`);
  const data = response.data.songs;

  return data;
}

function* handleSongsLoad() {
  try {
    const songs = yield call(fetchSongs, '603279f28299870ff4bcd376');
    yield put(setSongs(songs));
  } catch (error) {
    yield put(setError('get songs error!'));
  }
}

// watcher
function* watchSongsLoad() {
  yield takeEvery(SONGS.LOAD, handleSongsLoad);
}

export default watchSongsLoad;