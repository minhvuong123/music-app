import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

// styles scss
import styles from './play-list.module.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';
import Album from 'components/album/Album.component';

function UserPlayList() {
  const token = localStorage.getItem('token') as string;
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        const resultAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`);
        setAlbums(resultAlbums.data.albums);
      }
    });
  }, [token]);
  return (
    <div className={styles.user_play_list}>
      {
        albums && albums.map((album: any) => {
          return (
            <div key={album._id} className={[styles.album_item, styles.margin_left_20].join(' ')}>
              <Album album={album} />
            </div>
          )
        })
      }
    </div>
  );
}

export default UserPlayList;
