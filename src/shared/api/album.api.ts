import axios from "axios";
import { apiLink } from "shared/const";

export async function getAlbumApi(albumId: string) {;
  const response = await axios.get(`${apiLink}/albums/${albumId}`);
  const data = response.data.album;

  return data;
}