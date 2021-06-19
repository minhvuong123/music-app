import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// ant
import {
  CaretRightOutlined,
  HeartOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';

// assets
import { apiLink } from 'shared/const';
import { convertSingers, formatNumberToTime } from 'shared/converter';
import axios from 'axios';
import { loadSongAction, setPlayAction, updateSongAction } from 'shared/redux/actions';

// scss
import './song.scss';
import { ComponentModel, SongModel } from 'shared/model';
import SongMoreAction from 'shared/components/song-more-action/song-more-action.component';

function Song({ song, songSaga, loadSongAction, playStatus, setPlayAction, callBackPlaySong, updateSongAction }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [isChosen, setIsChosen] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        setUser(decoded._doc);
      }
    });

    if (song._id === songSaga._id) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [song, songSaga, token])

  function handlePlaySong() {
    if (song._id !== songSaga._id) {
      loadSongAction(song);
      setPlayAction(true);
      callBackPlaySong();
    }
    else {
      setPlayAction(!playStatus);
    }
  }

  function removeFromUser(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const payload = {
      _id: song._id,
      song_user_id: ''
    }
    axios.patch(`${apiLink}/songs`, { song: payload }).then(result => {
      updateSongAction(payload._id, {song_user_id : payload.song_user_id});
    })
  }

  function addToUser(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const payload = {
      _id: song._id,
      song_user_id: user._id
    }
    axios.patch(`${apiLink}/songs`, { song: payload }).then(result => {
      updateSongAction(payload._id, {song_user_id : payload.song_user_id});
    })
  }

  return (
    <div className={`song ${isChosen ? "active" : ""}`}>
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
            <div className="card__name">{song.song_name}</div>
            <div className="card__name">{convertSingers(song.song_singer)}</div>
          </div>
        </div>
        <div className="media__content">
          <div className="duration">{formatNumberToTime(song.song_duration)}</div>
        </div>
        <div className="media__right">
          <div className="actions">
            {
              song && song.song_user_id === user._id
                ? <Tooltip placement="top" color="#383737" title="Xóa khỏi thư viện">
                  <div onClick={removeFromUser} className="action__btn action__btn--svg"><HeartOutlined /></div>
                </Tooltip>
                : <Tooltip placement="top" color="#383737" title="Thêm vào thư viện">
                  <div onClick={addToUser} className="action__btn"><HeartOutlined /></div>
                </Tooltip>
            }

            <div className="action__btn">
              <SongMoreAction song={song}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
    updateSongAction: (_id: string, songPayload: SongModel) => dispatch(updateSongAction(_id, songPayload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);