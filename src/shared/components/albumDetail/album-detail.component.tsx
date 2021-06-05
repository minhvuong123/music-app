import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAlbumAction, loadSongAction, setPlayAction } from 'shared/redux/actions';

// ant
import {
  PlayCircleOutlined,
  CaretRightOutlined,
  HeartOutlined,
  EllipsisOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// styles scss
import './album-detail.scss';

import { apiLink } from 'shared/const';
import Song from 'shared/components/song/song.component';
import album_default from 'images/album_default.png';
import axios from 'axios';
import { setSongsAction } from 'shared/redux/actions';
import { ComponentModel, SongModel } from 'shared/model';
import _ from 'lodash';


function AlbumDetail({ location, playStatus, setPlayAction, loadSongAction, songs, song, album, loadAlbumAction, setSongsAction }: ComponentModel) {
  const { albumId } = location.state;

  useEffect(() => {
    axios.patch(`${apiLink}/albums/view/${albumId}`).then(result => {
      loadAlbumAction(albumId);
      return null;
    });
    return () => { }
  }, [albumId, loadAlbumAction])
  
  function callBackPlaySong() {
    setSongsAction(songs);
  }

  function playAll() {
    if (!_.isEmpty(songs)) {
      loadSongAction(songs[0]);
      setSongsAction(songs);
    }
  }

  function handlePlaySong(e: any) {
    e.preventDefault();
    if (Object.keys(song).length > 0) {
      setPlayAction(!playStatus);
    } else {
      loadSongAction(songs[0]);
    }
  }

  return album && Object.keys(album).length > 0 ? (
    <div className="album">
      <div className="album__left">
        <a href="/" onClick={handlePlaySong} className="block_container">
          <div className="block">
            <div className="block__image">
              {
                album.album_url_image || songs!.length > 0
                  ? <img src={`${apiLink}/${album.album_url_image || songs[0].song_url_image}`} alt={album.album_name} />
                  : <img src={album_default} alt={album.album_name} />
              }
            </div>
           <div className={`block__opacity ${playStatus ? "isPlay" : ""}`}></div>
            <div className={`block__btn ${playStatus ? "isPlay" : ""}`}> 
              {playStatus ? <LoadingOutlined /> : <PlayCircleOutlined />}
            </div>
          </div>
        </a>
        <div className="content__container">
          <div className="content__top">
            <h3 className="name">{album.album_name}</h3>
            <p className="time">Cập nhật: 19/02/2021</p>
            <p className="view">630,128 người yêu thích</p>
          </div>
          <div className="content__actions">
            <div className={`content__btn ${_.isEmpty(songs) ? "disabled" : ""}`}>
              <span className="icon"><CaretRightOutlined /></span>
              <span className="text" onClick={playAll}>Phát Ngẫu Nhiên</span>
            </div>
            <div className="content__level">
              <span className="level__item"><HeartOutlined /></span>
              <span className="level__item"><EllipsisOutlined /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="album__right">
        <div className="album__songs">
          {
            songs && songs.map((s: SongModel) => <Song key={s._id} song={s} callBackPlaySong={callBackPlaySong} />)
          }
        </div>
      </div>
    </div>
  ) : "";
}

const mapStateToProps = ({ isLoading, play, songs, song, album, error }: any) => {
  return {
    isLoading,
    playStatus: play,
    songs,
    song,
    album,
    error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadAlbumAction: (albumId: string) => dispatch(loadAlbumAction(albumId)),
    loadSongAction: (song: any) => dispatch(loadSongAction(song)),
    setSongsAction: (songs: any) => dispatch(setSongsAction(songs)),
    setPlayAction: (status: boolean) => dispatch(setPlayAction(status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail as any);
