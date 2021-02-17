export interface Audio {
  audioSrc: string;
  status: boolean;
  next: Function;
  previous: Function;
}

export interface UploadType {
  limit: number;
  isSubmit: boolean;
  handleChangeImage: Function;
}

export interface Song {
  song_name: string;
  song_singer: string; 
  song_url_image: string; 
  song_url_music: string;
  song_id_playlist: string; 
  created_at: string;
}

export interface playListType {
  playList_name: string,
  playList_category: string;
  playList_country: string;
  playList_url_image: string;
  created_at: string;
}

export interface categoryType {
  _id: string,
  category_name: string;
  created_at: string;
}

export interface singerType {
  singer_name: string;
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