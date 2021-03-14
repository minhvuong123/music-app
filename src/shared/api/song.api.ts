import axios from "axios";
import { apiLink } from "shared/const";

export async function getSongsApi(albumId: string) {;
  const response = await axios.get(`${apiLink}/songs/${albumId}`);
  const data = response.data.songs;

  return data;
}

export async function getSongApi(id: string) {;
  const response = await axios.get(`${apiLink}/songs/song/${id}`);
  const data = response.data.songs;

  return data;
}