import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// ant
import {
  CaretRightOutlined
} from '@ant-design/icons';

// components
import Song from 'shared/components/song/Song.component';

// assets
import { songType } from 'shared/types';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { loadSongAction, setSongsAction } from 'shared/redux/actions';

// styles scss
import './new-songs.scss';

function NewSongsComponent({ setSongsAction, loadSongAction }: any) {
  const token = localStorage.getItem('token') as string;
  const [songs, setSongs] = useState<any>([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function loadData() {
      jwt.verify(token, 'kiwi', async function (err, decoded: any) {
        if (!err) {
          const resultSongs = await axios.get(`${apiLink}/songs/new`);
          setSongs(resultSongs.data.songs);

          const resultAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`);
          setAlbums(resultAlbums.data.albums);
        }
      });
    }

    loadData();

    return () => { }
  }, [token])

  function callBackPlaySong() {
    setSongsAction(songs);
  }

  function playAll(){
    loadSongAction(songs[0]);
    setSongsAction(songs);
  }

  return (
    <div className="new__songs">
      <div className="new__title">
        <h3>
          Mới Phát Hành
          <div onClick={playAll} className="new__btn">
            <CaretRightOutlined />
          </div>
        </h3>
      </div>
      {
        songs && songs.map((s: songType, index: number) => (
          <div key={s._id} className="d-flex">
            <span className={`song__number ${index === 0 ? "number__1" : index === 1 ? "number__2" : index === 2 ? "number__3" : ""}`}>{index + 1}</span>
            <div className="song__content">
              <Song song={s} albums={albums} callBackPlaySong={callBackPlaySong} />
            </div>
          </div>
        ))
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadSongAction: (song: any) => dispatch(loadSongAction(song)),
    setSongsAction: (songs: any) => dispatch(setSongsAction(songs))
  }
}

export default connect(null, mapDispatchToProps)(NewSongsComponent);
