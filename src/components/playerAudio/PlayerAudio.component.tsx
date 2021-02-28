import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

// ant design
import {
  HeartOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  RetweetOutlined,
  CaretLeftFilled,
  CaretRightFilled
} from '@ant-design/icons';
import { Tooltip, Popover } from 'antd';

// react icon
import { IoMdVolumeHigh } from "react-icons/io";
import { BsMusicNoteList } from "react-icons/bs";


// styles
import 'antd/dist/antd.css';
import styles from './player-audio.module.scss';

// interface
import { apiLink } from 'shared/const';
import { convertSingers, formatNumberToTime } from 'shared/converter';
import { setPlayListStatus } from 'shared/redux/actions';


function PlayerAudio({ song, audioSrc, playStatus, playListStatus, setPlayListStatus, playFunc, endFunc, next, previous }: any) {
  const audioRef = useRef({} as HTMLAudioElement);
  const progressRef = useRef({} as HTMLDivElement);
  const progressRef_volume = useRef({} as HTMLDivElement);

  // const [playStatus, setPlayStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const audioID = document.getElementById('audio') as any; // just get duration time of audio

    if (audioSrc && playStatus) {
      audio.play();
    } else {
      audio.pause();
    }

    audio.addEventListener("loadeddata", () => {
      // init value
      setDurationTime(Math.floor(audioID.duration));
      setCurrentTime(Math.floor(audio.currentTime));
    });

    audio.addEventListener('timeupdate', () => {
      // listen and set current time -> total time of audio
      setCurrentTime(Math.floor(audio.currentTime));
      const percentage = audio.currentTime / audio.duration * 100;
      progressRef.current.style.width = percentage + '%';
      console.log(audioRef.current.volume);
      if (audio.currentTime === audio.duration) {
        endFunc();
      }
    }, false);

    return () => {
      audio.addEventListener("loadeddata", () => { }, false);
      audio.removeEventListener('timeupdate', () => { }, false);
    }
  }, [audioSrc, playStatus, endFunc])

  function playAudio(): void {
    const audio = audioRef.current;
    if (audioSrc) {
      if (!playStatus) {
        audio.play();
      } else {
        audio.pause();
      }
      playFunc(!playStatus);
    }
  }

  function nextSong() {
    next();
  }

  function previousSong() {
    previous();
  }

  function handleProgress(e: any) {
    e.stopPropagation();
    const boundingClient = e.target.getBoundingClientRect();
    const percentage = (e.clientX - boundingClient.left) / boundingClient.width * 100;
    if (percentage < 0) {
      progressRef.current.style.width = 0 + '%';
      setCurrentTime(0);
      audioRef.current.play();
    } else {
      progressRef.current.style.width = percentage + '%';
      setCurrentTime(percentage * durationTime);
      audioRef.current.currentTime = (percentage * durationTime) / 100;
      audioRef.current.play(); // after updating currentTime -> should be run play() to audio working correct
    }
  }

  function handleProgressVolume(e: any) {
    e.stopPropagation();
    const boundingClient = e.target.getBoundingClientRect();
    const percentage = (e.clientX - boundingClient.left) / boundingClient.width * 100;
    if (percentage < 0) {
      progressRef_volume.current.style.width = 0 + '%';
      audioRef.current.volume = 0;
    } else {
      progressRef_volume.current.style.width = percentage + '%';
      audioRef.current.volume = percentage / 100;
    }
  }

  function handleVisibleChange(visible: boolean) {
    setVisible(visible);
  };

  function handlePlayListStatus() {
    setPlayListStatus(!playListStatus);
  }

  return (
    <div className={styles.player_control}>
      <audio data-html5-video preload='none' id='audio' ref={audioRef} src={audioSrc}></audio>
      <div className={styles.player_control_left}>
        <div className={styles.media}>
          <div className={styles.media_left}>
            <a href="/">
              <div className={[styles.media_left_circle, `${playStatus ? styles.spin : ''}`].join(' ')}>
                {
                  song && song.song_url_image
                  && <img src={`${apiLink}/${song.song_url_image}`} alt="music" />
                }
              </div>
            </a>
          </div>
          <div className={styles.media_content}>
            <div className={styles.song_info}>
              <a href="/">
                {
                  song && song.song_url_image
                    ? song.song_name
                    : "..."
                }
              </a>
            </div>
            <div className={styles.singer_name}>
              <a href="/">
                {
                  song && song.song_url_image
                    ? convertSingers(song.song_singer)
                    : "..."
                }
              </a>
            </div>
          </div>
          <div className={styles.media_right}>
            <div className={styles.icon_list}>
              <Tooltip placement="top" color="#383737" title="Thêm vào thư viện">
                <span className={styles.btn_icon}><HeartOutlined /></span>
              </Tooltip>
              <Popover
                title="Title"
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
              >
                <Tooltip placement="top" color="#383737" title="Xem thêm">
                  <span className={[styles.btn_icon, styles.margin_left_10].join(' ')}>
                    <EllipsisOutlined />
                  </span>
                </Tooltip>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.player_control_bar}>
        <div className={styles.control_bar_btn}>
          <Tooltip placement="top" color="#383737" title="Bật phát tất cả">
            <span className={[styles.btn_icon, styles.font_size_20, styles.margin_left_10, styles.margin_right_10].join(' ')}>
              <RetweetOutlined />
            </span>
          </Tooltip>
          <span onClick={previousSong} className={[styles.btn_icon, styles.font_size_20, styles.margin_left_10, styles.margin_right_10].join(' ')}>
            <CaretLeftFilled />
          </span>
          <span onClick={playAudio} className={[styles.play_icon, styles.margin_left_10, styles.margin_right_10, styles.font_size_30].join(' ')}>
            {playStatus ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </span>
          <span onClick={nextSong} className={[styles.btn_icon, styles.font_size_20, styles.margin_left_10, styles.margin_right_10].join(' ')}>
            <CaretRightFilled />
          </span>
          <Tooltip placement="top" color="#383737" title="Bật phát ngẫu nhiên">
            <span className={[styles.btn_icon, styles.font_size_20, styles.margin_left_10, styles.margin_right_10].join(' ')}>
              <RetweetOutlined />
            </span>
          </Tooltip>
        </div>
        <div className={styles.control_bar_progress}>
          <span className={styles.time_left}>
            {formatNumberToTime(currentTime)}
          </span>
          <div className={styles.progress_container}>
            <div className={styles.progress}>
              <div onClick={handleProgress} className={styles.progress_absolute}></div>
              <div ref={progressRef} className={styles.progress_run}></div>
            </div>
          </div>
          <span className={styles.time_right}>
            {formatNumberToTime(durationTime)}
          </span>
        </div>
      </div>
      <div className={styles.player_control_right}>
        <div className={styles.control_right_btn}>
          <div className={styles.btn_volume}>
            <Tooltip placement="top" color="#383737" title="Danh sách phát">
              <span className={styles.volume}>
                <IoMdVolumeHigh />
              </span>
            </Tooltip>
            <div className={styles.progress_volume}>
              <div className={styles.progress}>
                <div onClick={handleProgressVolume} className={styles.progress_absolute_volume}></div>
                <div ref={progressRef_volume} className={styles.progress_run}></div>
              </div>
            </div>
          </div>
          <div className={styles.line}></div>
          <div onClick={handlePlayListStatus} className={styles.btn_music_list}>
            <Tooltip placement="top" color="#383737" title="Danh sách phát">
              <span className={styles.volume}>
                <BsMusicNoteList />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div >
  );
}

const mapStateToProps = ({ status }: any) => {
  return {
    playListStatus: status.playListStatus
  }
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    setPlayListStatus: (status: boolean) => dispatch(setPlayListStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
