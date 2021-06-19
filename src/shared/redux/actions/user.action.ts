import { AlbumModel } from 'shared/model';
import { USER } from 'shared/redux/const';

export function setUserAlbums(albums: AlbumModel[]) {
  return {
    type: USER.LOAD_ALBUM,
    albums
  }
} 
