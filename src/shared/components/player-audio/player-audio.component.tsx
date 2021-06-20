import { useEffect, useRef, useState } from 'react';
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
import './player-audio.scss';

// assets
import { apiLink } from 'shared/const';
import { convertSingers, formatNumberToTime } from 'shared/converter';
import { setPlayListStatus } from 'shared/redux/actions';
import { ComponentModel } from 'shared/model';


function PlayerAudio({ song, audioSrc, playStatus, playListStatus, setPlayListStatus, playFunc, endFunc, next, previous }: ComponentModel) {
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
      progressRef_volume.current.style.width = 100 + '%';
    });

    audio.addEventListener('timeupdate', () => {
      // listen and set current time -> total time of audio
      setCurrentTime(Math.floor(audio.currentTime));
      const percentage = audio.currentTime / audio.duration * 100;
      
      if(progressRef && progressRef.current) {
        progressRef.current.style.width = percentage + '%';
      }

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
    <div className="player">
      <audio data-html5-video preload='none' id='audio' ref={audioRef} src={audioSrc}></audio>
      <div className="player__left">
        <div className="media">
          <div className="media__left">
            <a href="/">
              <div className={`circle ${playStatus ? "spin" : ""}`}>
                {
                  song && song.song_url_image
                  && <img src={`${apiLink}/${song.song_url_image}`} alt="music" />
                }
              </div>
            </a>
          </div>
          <div className="media__content">
            <div className="song__info">
              <a href="/">
                {
                  song && song.song_url_image
                    ? song.song_name
                    : "..."
                }
              </a>
            </div>
            <div className="singer__name">
              <a href="/">
                {
                  song && song.song_url_image
                    ? convertSingers(song.song_singer)
                    : "..."
                }
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="player__bar">
        <div className="control__btn">
          <Tooltip placement="top" color="#383737" title="Bật phát tất cả">
            <span className="icon__btn fs__20 ml__10 margin_right_10">
              <RetweetOutlined />
            </span>
          </Tooltip>
          <span onClick={previousSong} className="icon__btn fs__20 ml__10 mr__10">
            <CaretLeftFilled />
          </span>
          <span onClick={playAudio} className="play_icon ml__10 mr__10 fs__30">
            {playStatus ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </span>
          <span onClick={nextSong} className="icon__btn fs__20 ml__10 mr__10">
            <CaretRightFilled />
          </span>
          <Tooltip placement="top" color="#383737" title="Bật phát ngẫu nhiên">
            <span className="icon__btn fs__20 ml__10 mr__10">
              <RetweetOutlined />
            </span>
          </Tooltip>
        </div>
        <div className="control__progress">
          <span className="time">
            {formatNumberToTime(currentTime)}
          </span>
          <div className="progress__container">
            <div className="progress">
              <div onClick={handleProgress} className="progress__absolute"></div>
              <div ref={progressRef} className="progress__run"></div>
            </div>
          </div>
          <span className="time">
            {formatNumberToTime(durationTime)}
          </span>
        </div>
      </div>
      <div className="player__right">
        <div className="actions">
          <div className="actions__volume">
            <Tooltip placement="top" color="#383737" title="Danh sách phát">
              <span className="volume">
                <IoMdVolumeHigh />
              </span>
            </Tooltip>
            <div className="actions__progress">
              <div className="progress">
                <div onClick={handleProgressVolume} className="progress__absolute"></div>
                <div ref={progressRef_volume} className="progress__run"></div>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div onClick={handlePlayListStatus} className="music__btn">
            <Tooltip placement="top" color="#383737" title="Danh sách phát">
              <span className="volume">
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
