import { SONGS } from 'shared/redux/const';

export function loadSongs() {
  return {
    type: SONGS.LOAD
  }
} 

export function setSongs(songs: any) {
  return {
    type: SONGS.LOAD_SUCCESS,
    songs
  }
} 

export function setError(error: any) {
  return {
    type: SONGS.LOAD_FAIL,
    error
  }
} 