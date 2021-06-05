import { SongModel } from 'shared/model';
import { SONGS } from 'shared/redux/const';

export default function songsReducer(songs = [] as SongModel[], action: any) {
  switch(action.type) {
    case SONGS.LOAD_SUCCESS:
      songs = action.songs; 
      return [...songs];
    case SONGS.UPDATE: 
      const songIndex = songs.findIndex(song => song._id === action._id);
      songs[songIndex] = {...songs[songIndex], ...action.songPayload};
      return [...songs];
    default:
      return [...songs];
  }
}