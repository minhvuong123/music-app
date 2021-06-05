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
import _ from 'lodash';

function NewSongsComponent({ setSongsAction, loadSongAction, songs }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [albums] = useState([]);

  useEffect(() => {
    async function loadData() {
      const resultSongs = await axios.get(`${apiLink}/songs/new`);
      setSongsAction(resultSongs.data.songs);
      return null;
    }

    if (_.isEmpty(songs)) {
      loadData();
    }

      return () => { }
    }, [token, songs, setSongsAction])

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

const mapStateToProps = ({ songs }: any) => {
  return {
    songs
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadSongAction: (song: any) => dispatch(loadSongAction(song)),
    setSongsAction: (songs: any) => dispatch(setSongsAction(songs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSongsComponent);
