import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadSongAction, setPlayAction } from 'shared/redux/actions';

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
import { convertSingers, formatNumberToTime } from 'shared/converter';

function Song({ song, songSaga, loadSongAction, playStatus, setPlayAction }: any) {
  const [isChosen, setIsChosen] = useState(false);
  
  useEffect(() => {
    if (song._id === songSaga._id) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [song, songSaga])

  function handlePlaySong() {
    if (song._id !== songSaga._id) {
      loadSongAction(song);
      setPlayAction(true);
    }
    else {
      setPlayAction(!playStatus);
    }
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
                isChosen && playStatus ? <LoadingOutlined /> : <CaretRightOutlined />
              }
            </div>
          </div>
          <div className={styles.card_info}>
            <div className={styles.song_name}>{song.song_name}</div>
            <div className={styles.singer_name}>{convertSingers(song.song_singer)}</div>
          </div>
        </div>
        <div className={styles.media_content}>
          <div className={styles.duration}>{formatNumberToTime(song.song_duration)}</div>
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