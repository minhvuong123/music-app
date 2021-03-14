import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
import { setSongsAction } from 'shared/redux/actions';
import SlideList from 'components/slideList/slideList.component';

function UserSongs({ setSongsAction }: any) {
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

  function callBackPlaySong() {
    setSongsAction(songs);
  }

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    infinite: true,
    nextArrow: false,
    prevArrow: false,
    responsive: false,
    autoplay: true,
  };

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
      <div className={styles.song_content_container}>
        <div className={styles.song_uploaded}>
          <span>Đã tải lên: {songs.length}/200</span>
          <div className={styles.progress}></div>
        </div>
        <div className={styles.song_content}>
          <div className={styles.song_slide}>
            <SlideList slideSetting={settings}>
              <div>
                {
                  songs && songs.map((song: songType) => (
                    <div key={song._id} style={{ width: 100 }}>
                      <img src={`${apiLink}/${song.song_url_image}`} alt="music app" />
                    </div>
                  ))
                }
              </div>
            </SlideList>
          </div>
          <div className={styles.songs_container}>
            {
              songs && songs.map((song: songType) => <Song key={song._id} song={song} albums={albums} callBackPlaySong={callBackPlaySong} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch: any) => {
  return {
    setSongsAction: (name: string) => dispatch(setSongsAction(name))
  }
}

export default connect(null, mapDispatchToProps)(UserSongs);
