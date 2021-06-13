import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// ant
import {
  CaretRightOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Popover, Tooltip, Input } from 'antd';
import { AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

// assets
import { apiLink } from 'shared/const';
import { convertSingers, formatNumberToTime } from 'shared/converter';
import axios from 'axios';
import { loadSongAction, setPlayAction, updateSongAction } from 'shared/redux/actions';

// scss
import './song.scss';
import { AlbumModel, ComponentModel, SongModel } from 'shared/model';

function Song({ song, songSaga, albums, loadSongAction, playStatus, setPlayAction, callBackPlaySong, updateSongAction }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [isChosen, setIsChosen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<any>({});
  const [userAlbums, setUserAlbums] = useState<AlbumModel[]>([]);

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        setUser(decoded._doc);
        const resultAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`);
        if (resultAlbums && resultAlbums.data && resultAlbums.data.albums) {
          setUserAlbums(resultAlbums.data.albums);
        }
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

  function content(currentSong: SongModel) {
    return (
      <div className="song__more">
        <div className="song__info">
          <div className="song__image">
            <img src={`${apiLink}/${currentSong.song_url_image}`} alt="" />
          </div>
          <div className="song__text">
            <span className="name name--song">{currentSong.song_name}</span>
            <span className="name">{convertSingers(currentSong.song_singer)}</span>
          </div>
        </div>
        <div className="song__actions">
          <div className="action__item">
            <span><AiOutlinePlus /> Thêm vào play list </span> <AiOutlineRight />
            <div className="popup">
              <ul className="menu-list">
                <li className="search-box">
                  <Input placeholder="Tìm playlist" />
                </li>
                <li className="init-play-list">
                  <span className="init-icon"><IoAddOutline /></span>
                  <span className="init-text">Tạo playlist mới</span>
                </li>
              </ul>
              <div className="play__list">
                {
                  userAlbums && userAlbums.map((album: any) => (
                    <div key={album._id} onClick={() => handleAddSongToAlbum(album._id, currentSong._id)} className="item">
                      <span className="init-icon"><BsMusicNoteList /></span>
                      <span className="init-text">{album.album_name}</span>
                    </div>
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
                content={content(song)}
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
    updateSongAction: (_id: string, songPayload: SongModel) => dispatch(updateSongAction(_id, songPayload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);