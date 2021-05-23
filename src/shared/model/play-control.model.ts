import { SongModel } from "./song.model";

export interface PlayControlModel {
  song?: SongModel;
  songs?: SongModel[];
}