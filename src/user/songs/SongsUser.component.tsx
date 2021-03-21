import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// components
import Song from 'shared/components/song/Song.component';
import UploadComponent from 'shared/components/upload/Upload.component';
import SlideList from 'shared/components/slideList/slideList.component';

// styles scss
import './songs-user.scss';

// icons
import {
  UploadOutlined
} from '@ant-design/icons';

// assets
import moment from 'moment';
import { setSongsAction } from 'shared/redux/actions';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { songType } from 'shared/types';

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
    <div className="user__songs">
      <div className="songs__title">
        <span>Bài Hát</span>
        <div className="actions">
          <div className="actions__upload">
            <UploadComponent
              listType='text'
              showUploadList={false}
              limit={1}
              isSubmit={isSubmit}
              handleChangeImage={handleChangeMP3}
            >
              <div className="upload__btn">
                <UploadOutlined />
                <span className="ml__10">TẢI LÊN</span>
              </div>
            </UploadComponent>
          </div>
        </div>
      </div>
      <div className="song__container">
        <div className="song__uploaded">
          <span>Đã tải lên: {songs.length}/200</span>
          <div className="progress"></div>
        </div>
        <div className="song__content">
          <div className="song__slide">
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
          <div className="songs__container">
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
    setSongsAction: (songs: any) => dispatch(setSongsAction(songs))
  }
}

export default connect(null, mapDispatchToProps)(UserSongs);
