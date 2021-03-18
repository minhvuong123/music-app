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
import { Popover } from 'antd';
import { AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import axios from 'axios';

function Song({ song, songSaga, albums, loadSongAction, playStatus, setPlayAction, callBackPlaySong }: any) {
  const [isChosen, setIsChosen] = useState(false);
  const [visible, setVisible] = useState(false);

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
    axios.patch(`${apiLink}/songs`, {song: payLoad}).then(result => {
      // handle to message success
    })
  }

  function removeFromUser(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const payload = {
      _id: song._id,
      song_user_id: '',
      song_id_albums: ''
    }
    axios.patch(`${apiLink}/songs`, { song: payload }).then(result => {})
  }

  function content() {
    return (
      <div className={styles.song_more}>
        <div className={styles.song_info}>
          <div className={styles.song_image}>
            <img src={`${apiLink}/${song.song_url_image}`} alt="" />
          </div>
          <div className={styles.song_text}>
            <span className={styles.song_name}>{song.song_name}</span>
            <span className={styles.singer_name}>{convertSingers(song.song_singer)}</span>
          </div>
        </div>
        <div className={styles.action_list}>
          <div className={styles.action_item}>
            <span><AiOutlinePlus /> Thêm vào play list </span> <AiOutlineRight />
            <div className={styles.item_pop_up}>
              <div className={styles.play_list}>
                {
                  albums && albums.map((album: any) => (
                    <span key={album._id} onClick={() => handleAddSongToAlbum(album._id, song._id)} className={styles.list_item}>
                      <BsMusicNoteList /> {album.album_name}
                    </span>
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
            {
              song && song._id
              ? <div onClick={removeFromUser} className={[styles.action_btn, styles.fillSVG].join(' ')}><HeartOutlined /></div>
              : <div className={styles.action_btn}><HeartOutlined /></div>
            }
            
            <div className={styles.action_btn}>
              <Popover
                className={styles.more_action}
                content={content}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);