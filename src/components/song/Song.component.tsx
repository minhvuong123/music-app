import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadSongAction } from 'shared/redux/actions';

// ant
import {
  CaretRightOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// scss
import styles from './song.module.scss';

import { apiLink } from 'shared/const';
import { convertSingers } from 'shared/converter';

function Song({ song, songSaga, loadSongAction }: any) {
  const [play, setPlay] = useState(false);
  const [isChosen, setIsChosen] = useState(false);

  useEffect(()=> {
    if(song._id === songSaga._id) {
      setIsChosen(true);
      setPlay(p => !p);
    } else {
      setIsChosen(false);
      setPlay(false);
    }
  }, [song, songSaga])

  function handlePlaySong(){
    loadSongAction(song);
  }
  return (
    <div className={[styles.app_song, `${isChosen ? styles.active : ''}`].join(' ')}>
      <div className={styles.app_media}>
        <div className={styles.media_left}>
          <div onClick={handlePlaySong} className={styles.media_thumb}>
            <div className={styles.images}>
              <img src={`${apiLink}/${song.song_url_image}`} alt="album" />
            </div>
            <div className={styles.opacity}></div>
            <div className={styles.play_btn}>
              {
                isChosen && play ? <LoadingOutlined /> : <CaretRightOutlined />
              }
            </div>
          </div>
          <div className={styles.card_info}>
            <div className={styles.song_name}>{song.song_name}</div>
            <div className={styles.singer_name}>{convertSingers(song.song_singer)}</div>
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

const mapStateToProps = ({ song }: any) => {
  return {
    songSaga: song
  }
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    loadSongAction: (song: any) => dispatch(loadSongAction(song)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);