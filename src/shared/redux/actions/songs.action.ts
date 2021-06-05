import { SongModel } from 'shared/model';
import { SONGS, SONG } from 'shared/redux/const';

export function loadSongsAction() {
  return {
    type: SONGS.LOAD
  }
} 

export function setSongsAction(songs: SongModel[]) {
  return {
    type: SONGS.LOAD_SUCCESS,
    songs
  }
} 

export function updateSongAction(_id: string, songPayload: SongModel) {
  return {
    type: SONGS.UPDATE,
    _id,
    songPayload
  }
}

export function loadSongAction(song: SongModel) {
  return {
    type: SONG.LOAD,
    song
  }
} 

export function setSongAction(song: SongModel) {
  return {
    type: SONG.LOAD_SUCCESS,
    song
  }
} 
