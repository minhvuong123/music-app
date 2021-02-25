import { ALBUM } from 'shared/redux/const';

export function loadAlbumAction(name: string) {
  return {
    type: ALBUM.LOAD,
    name
  }
} 

export function setAlbumAction(album: any) {
  return {
    type: ALBUM.LOAD_SUCCESS,
    album
  }
} 