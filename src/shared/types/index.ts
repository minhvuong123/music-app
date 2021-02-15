export interface Audio {
  audioSrc: string;
  status: boolean;
  next: Function;
  previous: Function;
}

export interface Song {
  song_name: string;
  song_singer: string; 
  song_url_image: string; 
  song_url_music: string;
  song_id_playlist: string; 
  created_at: string;
}

export interface UploadType{
  limit: number;
  isSubmit: boolean;
  handleChangeImage: Function;
}