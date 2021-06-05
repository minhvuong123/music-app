import { AlbumModel } from 'shared/model';
import { ALBUM } from 'shared/redux/const';

export function loadAlbumAction(albumId: string) {
  return {
    type: ALBUM.LOAD,
    albumId
  }
} 

export function setAlbumAction(album: any) {
  return {
    type: ALBUM.LOAD_SUCCESS,
    album
  }
} 

export function updateAlbumAction(_id: string, payLoad: AlbumModel) {
  return {
    type: ALBUM.UPDATE,
    payLoad
  }
} 