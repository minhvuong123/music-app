import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadSongs } from 'shared/redux/actions';

// ant
import {
  PlayCircleOutlined,
  CaretRightOutlined,
  HeartOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

// styles scss
import styles from './album-detail.module.scss';

import { apiLink } from 'shared/const';
import axios from 'axios';
import { songType } from 'shared/types';
import Song from 'components/song/Song.component';



function AlbumDetail({ match, songs, loadSongs }: any) {
  const { name } = match.params;
  const [album, setAlbum] = useState<any>({});
  // const [songs, setSongs] = useState<any>([]);

  useEffect(() => {
    async function loadData() {
      const resultAlbum = await axios.get(`${apiLink}/albums/${name}`)
      if (resultAlbum && resultAlbum.data && resultAlbum.data.album) {
        setAlbum(resultAlbum.data.album);
      }

      loadSongs();
      // const resultSong = await axios.get(`${apiLink}/songs/${resultAlbum.data.album._id}`)
      // if (resultSong && resultSong.data && resultSong.data.songs) {
      //   setSongs(resultSong.data.songs);
      // }
    }
    loadData();
    return () => { }
  }, [name, loadSongs])

  return album && Object.keys(album).length > 0 ? (
    <div className={styles.app_album}>
      <div className={styles.album_left}>
        <a href="/" className={styles.album_wrap}>
          <div className={styles.album_image}>
            <div className={styles.images}>
              <img src={`${apiLink}/${album.album_url_image}`} alt={album.album_name} />
            </div>
            <div className={styles.opacity}></div>
            <div className={styles.play_btn}>
              <PlayCircleOutlined />
            </div>
          </div>
        </a>
        <div className={styles.album_content}>
          <div className={styles.content_top}>
            <h3 className={styles.content_name}>{album.album_name}</h3>
            <p className={styles.content_z}>Cập nhật: 19/02/2021</p>
            <p className={styles.content_z}>630,128 người yêu thích</p>
          </div>
          <div className={styles.album_actions}>
            <div className={styles.play_btn_random}>
              <span className={styles.icon}><CaretRightOutlined /></span>
              <span className={styles.text}>Phát Ngẫu Nhiên</span>
            </div>
            <div className={styles.actions_level}>
              <span className={styles.level_item}><HeartOutlined /></span>
              <span className={styles.level_item}><EllipsisOutlined /></span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.album_right}>
        <div className={styles.app_song_list}>
          {
            songs && songs.map((s: songType) => <Song key={s._id} song={s} />)
          }
        </div>
      </div>
    </div>
  ) : "";
}

const mapStateToProps = ({ isLoading, songs, error }: any) => {
  return {
    isLoading, 
    songs, 
    error
  }
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    loadSongs: () => dispatch(loadSongs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail as any);
