import React from 'react';

// ant design
import {
  HeartOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

// styles
import styles from './block-song.module.scss';

// images
import songImage from 'images/block-song.jpg';


function BlockSong() {

  function playSong(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  return (
    <div className={styles.block_song_container}>
      <a href="/" className={styles.block_song}>
        <div className={styles.block_song_image}>
          <img src={songImage} alt="music app"/>
        </div>
        <div className={styles.song_opacity}></div>
        <div className={styles.block_song_action}>
          <Tooltip placement="top" color="#383737" title="Thêm vào thư viện">
            <div className={styles.song_icon}><HeartOutlined /></div>
          </Tooltip>
          <div onClick={playSong} className={[styles.song_play, styles.song_icon].join(' ')}>
            <PlayCircleOutlined />
          </div>
          <Tooltip placement="top" color="#383737" title="Khác">
            <div className={styles.song_icon}><EllipsisOutlined /></div>
          </Tooltip>
        </div>
      </a>
    </div>
  );
}

export default BlockSong;
