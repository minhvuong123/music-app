import React, { useEffect, useRef, useState } from 'react';

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
import { Tooltip } from 'antd';


// styles
import styles from './player-audio.module.scss';

// images
import music from 'images/music.jpg';

// interface
import { Audio } from 'types';


function PlayerAudio({ audioSrc, status, next, previous }: Audio) {
  const audioRef = useRef({} as HTMLAudioElement);
  const progressRef = useRef({} as HTMLDivElement);

  const [playStatus, setPlayStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const audioID = document.getElementById('audio') as any; // just get duration time of audio

    if (audioSrc) {
      audio.play();
      setPlayStatus(status);
    }

    audio.addEventListener("loadeddata", () => {
      // init value
      setDurationTime(Math.floor(audioID.duration));
      setCurrentTime(Math.floor(audio.currentTime));
    });

    // audio.onloadeddata = () => {
    //   setDurationTime(Math.floor(audioID.duration));
    //   setCurrentTime(Math.floor(audio.currentTime));
    // }

    // audio.onprogress = () => {
    //   console.log(currentTime);
    //   if (currentTime) {
    //     audio.currentTime = currentTime;
    //   }
    //   setCurrentTime(Math.floor(audio.currentTime));
    //   const percentage = audio.currentTime / audio.duration * 100;
    //   progressRef.current.style.width = percentage + '%';
    // }

    audio.addEventListener('timeupdate', () => {
      // listen and set current time -> total time of audio
      setCurrentTime(Math.floor(audio.currentTime));
      const percentage = audio.currentTime / audio.duration * 100;
      progressRef.current.style.width = percentage + '%';

      if (audio.currentTime === audio.duration) {
        setPlayStatus(false);
      }
    }, false);

    return () => {
      audio.addEventListener("loadeddata", () => { }, false);
      audio.removeEventListener('timeupdate', () => { }, false);
    }
  }, [audioSrc, status])

  function playAudio(): void {
    const audio = audioRef.current;
    if (audioSrc) {
      if (!playStatus) {
        audio.play();
        setPlayStatus(true);
      } else {
        audio.pause();
        setPlayStatus(false);
      }
    }
  }

  function formatNumberToTime(number: number): string {
    const date = new Date(0);
    date.setSeconds(number); // specify value for SECONDS here

    const timeString = date.toISOString().substr(11, 8);
    return timeString;
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

  return (
    <div className={styles.player_control}>
      <audio id='audio' ref={audioRef} src={audioSrc}></audio>
      <div className={styles.player_control_left}>
        <div className={styles.media}>
          <div className={styles.media_left}>
            <a href="/">
              <div className={[styles.media_left_circle, `${playStatus ? styles.spin : ''}`].join(' ')}>
                <img src={music} alt="music" />
              </div>
            </a>
          </div>
          <div className={styles.media_content}>
            <div className={styles.song_info}>
              <a href="/">Thích rồi đấy</a>
            </div>
            <div className={styles.singer_name}>
              <a href="/">Suni Hạ Linh</a>
            </div>
          </div>
          <div className={styles.media_right}>
            <div className={styles.icon_list}>
              <Tooltip placement="top" color="#383737" title="Thêm vào thư viện">
                <span className={styles.btn_icon}><HeartOutlined /></span>
              </Tooltip>
              <Tooltip placement="top" color="#383737" title="Xem thêm">
                <span className={[styles.btn_icon, styles.margin_left_10].join(' ')}>
                  <EllipsisOutlined />
                </span>
              </Tooltip>
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
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default PlayerAudio;
