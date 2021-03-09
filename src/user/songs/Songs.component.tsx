import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

// styles scss
import styles from './songs.module.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { songType } from 'shared/types';
import Song from 'components/song/Song.component';
import UploadComponent from 'components/upload/Upload.component';

import {
  UploadOutlined
} from '@ant-design/icons';
import moment from 'moment';

function UserSongs() {
  const token = localStorage.getItem('token') as string;
  const [isSubmit] = useState(false);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        const resultSongs = await axios.get(`${apiLink}/songs/user/${decoded._doc._id}`);
        setSongs(resultSongs.data.songs);

        const resultAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`);
        setAlbums(resultAlbums.data.albums);
      }
    });
  }, [token]);

  function handleChangeMP3(base64Result: string, type: string) {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (!err) {
        const resultData = {
          created_at: moment().toISOString(),
          song_country: "",
          song_id_albums: "",
          song_url_music: base64Result,
          song_user_id: decoded._doc._id
        }
        axios.post(`${apiLink}/songs`, { song: resultData }).then(result => {
          // handle to success message
        })
      }
    });
  }

  return (
    <div className={styles.user_songs}>
      <div className={styles.songs_title}>
        <span>Bài Hát</span>
        <div className={styles.songs_action}>
          <div className={styles.action_upload}>
            <UploadComponent
              listType='text'
              showUploadList={false}
              limit={1}
              isSubmit={isSubmit}
              handleChangeImage={handleChangeMP3}
            >
              <div className={styles.upload_btn}>
                <UploadOutlined />
                <span className={styles.margin_left}>TẢI LÊN</span>
              </div>
            </UploadComponent>
          </div>
        </div>
      </div>
      <div className={styles.song_uploaded}>
        <span>Đã tải lên: 1/200</span>
        <div className={styles.progress}></div>
      </div>
      <div className={styles.songs_container}>
        {
          songs && songs.map((s: songType) => <Song key={s._id} song={s} albums={albums} />)
        }
      </div>
    </div>
  );
}

export default UserSongs;
