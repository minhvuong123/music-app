import React from 'react';

// ant
import {
  CaretRightOutlined,
  EllipsisOutlined,
  HeartOutlined
} from '@ant-design/icons';

// scss
import styles from './song.module.scss';

import { apiLink } from 'shared/const';

function Song({ song }: any) {
  return (
    <div className={styles.app_song}>
      <div className={styles.app_media}>
        <div className={styles.media_left}>
          <div className={styles.media_thumb}>
            <div className={styles.images}>
              <img src={`${apiLink}/${song.song_url_image}`} alt="album" />
            </div>
            <div className={styles.opacity}></div>
            <div className={styles.play_btn}>
              <CaretRightOutlined />
            </div>
          </div>
          <div className={styles.card_info}>
            <div className={styles.song_name}>Đom Đóm</div>
            <div className={styles.singer_name}>Jack</div>
          </div>
        </div>
        <div className={styles.media_content}>
          <div className={styles.duration}>03:30</div>
        </div>
        <div className={styles.media_right}>
          <div className={styles.actions}>
            <div className={styles.action_btn}><HeartOutlined /></div>
            <div className={styles.action_btn}><EllipsisOutlined /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Song;