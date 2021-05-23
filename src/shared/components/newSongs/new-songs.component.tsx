import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// ant
import {
  CaretRightOutlined
} from '@ant-design/icons';

// components
import Song from 'shared/components/song/song.component';

// assets
import axios from 'axios';
import { apiLink } from 'shared/const';
import { loadSongAction, setSongsAction } from 'shared/redux/actions';

// styles scss
import './new-songs.scss';
import { ComponentModel, SongModel } from 'shared/model';

function NewSongsComponent({ setSongsAction, loadSongAction }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [songs, setSongs] = useState<any>([]);
  const [albums] = useState([]);

  useEffect(() => {
    async function loadData() {
      const resultSongs = await axios.get(`${apiLink}/songs/new`);
      setSongs(resultSongs.data.songs);
    }

    loadData();

    return () => { }
  }, [token])

  function callBackPlaySong() {
    setSongsAction(songs);
  }

  function playAll() {
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
        songs && songs.map((s: SongModel, index: number) => (
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
