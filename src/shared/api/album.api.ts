import axios from "axios";
import { apiLink } from "shared/const";

export async function getAlbumApi(name: string) {;
  const response = await axios.get(`${apiLink}/albums/${name}`);
  const data = response.data.album;

  return data;
}