import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// ant
import {
  CaretRightOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';
import { AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";

// assets
import { apiLink } from 'shared/const';
import { convertSingers, formatNumberToTime } from 'shared/converter';
import axios from 'axios';
import { loadSongAction, setPlayAction } from 'shared/redux/actions';

// scss
import './song.scss';

function Song({ song, songSaga, albums, loadSongAction, playStatus, setPlayAction, callBackPlaySong }: any) {
  const token = localStorage.getItem('token') as string;
  const [isChosen, setIsChosen] = useState(false);
  const [visible, setVisible] = useState(false);
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

  function handleVisibleChange(visible: boolean) {
    setVisible(visible);
  };

  function handleAddSongToAlbum(albumId: string, songId: string) {
    const payLoad = {
      _id: songId,
      song_id_albums: albumId
    }
    axios.patch(`${apiLink}/songs`, { song: payLoad }).then(result => {
      // handle to message success
    })
  }

  function removeFromUser(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const payload = {
      _id: song._id,
      song_user_id: '',
      song_id_albums: ''
    }
    axios.patch(`${apiLink}/songs`, { song: payload }).then(result => { })
  }

  function addToUser(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const payload = {
      _id: song._id,
      song_user_id: user._id
    }
    axios.patch(`${apiLink}/songs`, { song: payload }).then(result => {})
  }

  function content() {
    return (
      <div className="song__more">
        <div className="song__info">
          <div className="song__image">
            <img src={`${apiLink}/${song.song_url_image}`} alt="" />
          </div>
          <div className="song__text">
            <span className="name name--song">{song.song_name}</span>
            <span className="name">{convertSingers(song.song_singer)}</span>
          </div>
        </div>
        <div className="song__actions">
          <div className="action__item">
            <span><AiOutlinePlus /> Thêm vào play list </span> <AiOutlineRight />
            <div className="popup">
              <div className="play__list">
                {
                  albums && albums.map((album: any) => (
                    <span key={album._id} onClick={() => handleAddSongToAlbum(album._id, song._id)} className="item">
                      <BsMusicNoteList /> {album.album_name}
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

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
              <Popover
                content={content}
                placement="leftTop"
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
              ><EllipsisOutlined /></Popover>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);