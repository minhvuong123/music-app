import React, { useEffect } from 'react';

// ant
import {
  PlayCircleOutlined,
  CaretRightOutlined,
  HeartOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

import SongList from 'components/songList/SongList.component';

// styles scss
import styles from './album-detail.module.scss';

import picture from 'images/100_nhac-viet.jpg';


function AlbumDetail() {

  useEffect(() => {

    return () => { }
  }, [])
  return (
    <div className={styles.app_album}>
      <div className={styles.album_left}>
        <a href="/" className={styles.album_wrap}>
          <div className={styles.album_image}>
            <div className={styles.images}>
              <img src={picture} alt="album" />
            </div>
            <div className={styles.opacity}></div>
            <div className={styles.play_btn}>
              <PlayCircleOutlined />
            </div>
          </div>
        </a>
        <div className={styles.album_content}>
          <div className={styles.content_top}>
            <h3 className={styles.content_name}>Top 100 Bài Hát Nhạc Trẻ Hay Nhất</h3>
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
        <SongList />
      </div>
    </div>
  );
}

export default AlbumDetail;
