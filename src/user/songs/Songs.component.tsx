import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

// styles scss
import styles from './songs.module.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { songType } from 'shared/types';
import Song from 'components/song/Song.component';

function UserSongs() {
  const token = localStorage.getItem('token') as string;

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        const resultSongs = await axios.get(`${apiLink}/songs/user/${decoded._doc._id}`);
        setSongs(resultSongs.data.songs);
      }
    });
  }, [token]);

  return (
    <div className={styles.user_songs}>
      {
        songs && songs.map((s: songType) => <Song key={s._id} song={s} />)
      }
    </div>
  );
}

export default UserSongs;
