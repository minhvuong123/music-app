export interface Audio {
  song: any;
  audioSrc: string;
  playStatus: boolean;
  playListStatus: boolean;
  playFunc: Function;
  endFunc: Function;
  next: Function;
  previous: Function;
}

export interface UploadType {
  listType: any;
  showUploadList: boolean;
  limit: number;
  isSubmit: boolean;
  handleChangeImage: Function;
}

export interface songType {
  _id: string;
  song_name: string;
  song_singer: string; 
  song_url_image: string; 
  song_url_music: string;
  song_id_playlist: string; 
  created_at: string;
}

export interface albumType {
  _id: string,
  album_name: string,
  album_category: string;
  album_country: string;
  album_url_image: string;
  album_listShow: string;
  created_at: string;
}

export interface categoryType {
  _id: string,
  category_name: string;
  created_at: string;
}

export interface countryType {
  _id: string;
  country_name: string;
  created_at: string;
}

export interface singerType {
  _id: string;
  singer_name: string;
  created_at: string;
}

export interface albumListType {
  _id: string;
  albumList_name: string;
  created_at: string;
}

export interface playControlType {
  song: songType;
  songs: songType[];
}