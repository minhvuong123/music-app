import React, { useEffect, useState } from 'react';

// components
import PlayerAudio from 'components/playerAudio/PlayerAudio.component';
import { connect } from 'react-redux';
import { playControlType, songType } from 'shared/types';
import { apiLink } from 'shared/const';


function PlayControl({song, songs}: playControlType) {
  const [index, setIndex] = useState(-1);
  const [statusPlay, setStatusPlay] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    if (songs && songs.length) {
      const indexSong = songs.findIndex((s: songType) => s._id === song._id);
      setIndex(indexSong);
      if (songs[indexSong] && songs[indexSong].song_url_music) {
        setAudioUrl(`${apiLink}/${songs[indexSong].song_url_music}`);
        setStatusPlay(true);
      } else {
        setAudioUrl("");
        setStatusPlay(false);
      }
    }
    return () => { }
  }, [song, songs])

  function nextFunc() {
    if (index >= songs.length - 1) {
      setIndex(songs.length - 1);
      setAudioUrl(`${apiLink}/${songs[songs.length - 1].song_url_music}`);
    } else {
      setIndex(index + 1);
      setAudioUrl(`${apiLink}/${songs[index + 1].song_url_music}`);
    }
    setStatusPlay(true);
  }

  function previousFunc() {
    if (index <= 0) {
      setIndex(0);
      setAudioUrl(`${apiLink}/${songs[0].song_url_music}`);
    } else {
      setIndex(index - 1);
      setAudioUrl(`${apiLink}/${songs[index - 1].song_url_music}`);
    }
    setStatusPlay(true);
  }

  return (
    <PlayerAudio audioSrc={audioUrl} status={statusPlay} next={nextFunc} previous={previousFunc} />
  );
}

const mapStateToProps = ({ song, songs }: any) => {
  return {
    songs,
    song
  }
}

export default connect(mapStateToProps, null)(PlayControl);
