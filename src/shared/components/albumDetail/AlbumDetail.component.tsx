import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAlbumAction } from 'shared/redux/actions';

// ant
import {
  PlayCircleOutlined,
  CaretRightOutlined,
  HeartOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

// styles scss
import './album-detail.scss';

import { apiLink } from 'shared/const';
import { songType } from 'shared/types';
import Song from 'shared/components/song/Song.component';
import album_default from 'images/album_default.png';
import axios from 'axios';
import { setSongsAction } from 'shared/redux/actions';


function AlbumDetail({ location, songs, album, loadAlbumAction, setSongsAction }: any) {
  const { albumId } = location.state;

  useEffect(() => {
    axios.patch(`${apiLink}/albums/view/${albumId}`).then(result => {
      loadAlbumAction(albumId);
    });
    return () => { }
  }, [albumId, loadAlbumAction])
  
  function callBackPlaySong() {
    setSongsAction(songs);
  }

  return album && Object.keys(album).length > 0 ? (
    <div className="album">
      <div className="album__left">
        <a href="/" className="block_container">
          <div className="block">
            <div className="block__image">
              {
                album.album_url_image || songs.length > 0
                  ? <img src={`${apiLink}/${album.album_url_image || songs[0].song_url_image}`} alt={album.album_name} />
                  : <img src={album_default} alt={album.album_name} />
              }
            </div>
            <div className="block__opacity"></div>
            <div className="block__btn"><PlayCircleOutlined /></div>
          </div>
        </a>
        <div className="content__container">
          <div className="content__top">
            <h3 className="name">{album.album_name}</h3>
            <p className="time">Cập nhật: 19/02/2021</p>
            <p className="view">630,128 người yêu thích</p>
          </div>
          <div className="content__actions">
            <div className="content__btn">
              <span className="icon"><CaretRightOutlined /></span>
              <span className="text">Phát Ngẫu Nhiên</span>
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
            songs && songs.map((s: songType) => <Song key={s._id} song={s} callBackPlaySong={callBackPlaySong} />)
          }
        </div>
      </div>
    </div>
  ) : "";
}

const mapStateToProps = ({ isLoading, songs, album, error }: any) => {
  return {
    isLoading,
    songs,
    album,
    error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadAlbumAction: (albumId: string) => dispatch(loadAlbumAction(albumId)),
    setSongsAction: (songs: any) => dispatch(setSongsAction(songs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail as any);
