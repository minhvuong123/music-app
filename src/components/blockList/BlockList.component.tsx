import React from 'react';

// ant design
import {
  HeartOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

// styles
import styles from './block-list.module.scss';
import { apiLink } from 'shared/const';


function BlockList({ listSong }: any) {

  function playSong(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  return (
    <div className={styles.block_list_container}>
      <a href="/" className={styles.block_list}>
        <div className={styles.block_list_image}>
          <img src={`${apiLink}/${listSong.song_url_image}`} alt="music app"/>
        </div>
        <div className={styles.list_opacity}></div>
        <div className={styles.block_list_action}>
          <Tooltip placement="top" color="#383737" title="Thêm vào thư viện">
            <div className={styles.list_icon}><HeartOutlined /></div>
          </Tooltip>
          <div onClick={playSong} className={[styles.list_play, styles.list_icon].join(' ')}>
            <PlayCircleOutlined />
          </div>
          <Tooltip placement="top" color="#383737" title="Khác">
            <div className={styles.list_icon}><EllipsisOutlined /></div>
          </Tooltip>
        </div>
      </a>
      <div className={styles.block_list_name}>
        <a href="/" title={listSong.song_name}>{listSong.song_name}</a>
      </div>
      {/* <div className={styles.block_list_singer}>
        <a href="/" title={listSong.song_name}>{listSong.song_name}</a>
      </div> */}
    </div>
  );
}

export default BlockList;
