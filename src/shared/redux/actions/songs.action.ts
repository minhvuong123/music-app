import { SONGS, SONG } from 'shared/redux/const';

export function loadSongsAction() {
  return {
    type: SONGS.LOAD
  }
} 

export function setSongsAction(songs: any) {
  return {
    type: SONGS.LOAD_SUCCESS,
    songs
  }
} 

export function loadSongAction(song: any) {
  return {
    type: SONG.LOAD,
    song
  }
} 

export function setSongAction(song: any) {
  return {
    type: SONG.LOAD_SUCCESS,
    song
  }
} 
