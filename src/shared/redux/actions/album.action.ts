import { AlbumModel } from 'shared/model';
import { ALBUM } from 'shared/redux/const';

export function loadAlbumAction(albumId: string) {
  return {
    type: ALBUM.LOAD,
    albumId
  }
} 

export function setAlbumAction(album: AlbumModel) {
  return {
    type: ALBUM.LOAD_SUCCESS,
    album
  }
} 

export function updateAlbumAction(albumPayLoad: AlbumModel) {
  return {
    type: ALBUM.UPDATE,
    albumPayLoad
  }
} 