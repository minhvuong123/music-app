export interface AudioModel {
  song?: any;
  audioSrc?: string;
  playStatus?: boolean;
  playListStatus?: boolean;
  playFunc?: Function;
  endFunc?: Function;
  next?: Function;
  previous?: Function;
}