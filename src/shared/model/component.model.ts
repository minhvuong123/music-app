import { AlbumModel } from "./album.model";
import { CategoryModel } from "./category.model";
import { SongModel } from "./song.model";

export interface ComponentModel {
  // admin
  tabStatus?: boolean;
  contentStatus?: boolean;
  setContentChangeStatus?: Function | any;

  // album
  album?: AlbumModel | any;
  loadAlbumAction?: Function | any;
  albums?: AlbumModel[];
  updateAlbum?: Function | any;
  deleteAlbum?: Function | any;
  addUserAlbums?: Function | any;

  // song
  songs?: SongModel[] | any;
  setSongsAction?: Function | any;
  songSaga?: SongModel[] | any;
  song?: SongModel | any;
  loadSongAction?: Function | any;
  callBackPlaySong?: Function | any;
  updateSongAction?: Function | any;

  // song more action
  userId?: string;
  userAlbums?: AlbumModel[];
  setUserAlbums?: Function | any;

  category?: CategoryModel | any;
  
  getMenu?: Function | any;

  // router
  history?: any;
  location?: any;
  children?: any;
  match?: any;

  // audio
  playListStatus?: Function | any;
  setPlayListStatus?: Function | any;
  setPlayAction?: Function | any;
  playFunc?: Function | any;
  playStatus?: boolean;
  play?: boolean;
  audioSrc?: string | any;
  endFunc?: Function | any;
  next?: Function | any;
  previous?: Function | any;

  // slide show
  title?: string;
  slideSetting?: any;
  listType?: string | any;

  // upload
  showUploadList?: boolean;
  limit?: number;
  isSubmit?: boolean;
  handleChangeImage?: Function | any;

  // search
  updateSearch?: Function | any;
  search?: Object | any;
  searchItem?: Object | any;

  // side bar
  extendStatus?: boolean;
  setExtendSideBarStore?: Function | any;

  // user
  createPlayListStatus?: boolean;
  setCreatePlayList?: Function | any;
}