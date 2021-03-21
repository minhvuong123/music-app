import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// ant design
import {
  CaretRightOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// assets
import axios from 'axios';
import { loadSongAction, setPlayAction } from 'shared/redux/actions';
import { apiLink } from 'shared/const';
import { convertSingers } from 'shared/converter';

// styles scss
import './play-list-song.scss';

function PlayListSong({ song, songSaga, loadSongAction, playStatus, setPlayAction, callBackPlaySong}: any) {
  const [isChosen, setIsChosen] = useState(false);

  useEffect(() => {
    if (song._id === songSaga._id) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [song, songSaga])

  function handlePlaySong() {
    if (song._id !== songSaga._id) {
      loadSongAction(song);
      setPlayAction(true);
      axios.patch(`${apiLink}/songs/view/${song._id}`).then(result => {
        callBackPlaySong();
      });

    }
    else {
      setPlayAction(!playStatus);
    }
  }


  return (
    <div className={`songs ${isChosen ? "active" : ""}`}>
      <div className="media">
        <div className="media__left">
          <div onClick={handlePlaySong} className="thumb">
            <div className="thumb__images">
              <img src={`${apiLink}/${song.song_url_image}`} alt="album" />
            </div>
            <div className="thumb__opacity"></div>
            <div className="thumb__btn">
              {
                isChosen && playStatus ? <LoadingOutlined /> : <CaretRightOutlined />
              }
            </div>
          </div>
          <div className="card">
            <div className="card__name card__name--song">{song.song_name}</div>
            <div className="card__name">{convertSingers(song.song_singer)}</div>
          </div>
        </div>
        <div className="media__right">
          <div className="actions">
            <div className="action__btn"><HeartOutlined /></div>
            <div className="action__btn"><EllipsisOutlined /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ song, play }: any) => {
  return {
    songSaga: song,
    playStatus: play
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadSongAction: (song: any) => dispatch(loadSongAction(song)),
    setPlayAction: (status: boolean) => dispatch(setPlayAction(status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayListSong);
