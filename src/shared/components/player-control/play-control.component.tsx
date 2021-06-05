import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import PlayerAudio from 'shared/components/player-audio/player-audio.component';
import { apiLink } from 'shared/const';
import { ComponentModel, SongModel } from 'shared/model';
import { loadSongAction, setPlayAction } from 'shared/redux/actions';


function PlayControl({song, songs, loadSongAction, play, setPlayAction}: ComponentModel) {
  const [index, setIndex] = useState(-1);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    if (songs && songs.length) {
      const indexSong = songs.findIndex((s: SongModel) => s._id === song._id);
      setIndex(indexSong);
      if (songs[indexSong] && songs[indexSong].song_url_music) {
        setAudioUrl(`${apiLink}/${songs[indexSong].song_url_music}`);
        setPlayAction(true);
      } else {
        setAudioUrl("");
        setPlayAction(false);
      }
    }
    return () => { }
  }, [song, setPlayAction])

  function nextFunc() {
    let songIndex;
    if (songs.length > 0) {
      if (index >= songs.length - 1) {
        songIndex = songs.length - 1;
      } else {
        songIndex = index + 1;
      }
      loadSongAction(songs[songIndex]);
      setPlayAction(true);
    }
  }

  function previousFunc() {
    let songIndex;
    if (songs.length > 0) {
      if (index <= 0) {
        songIndex = 0;
      } else {
        songIndex = index - 1;
      }
      loadSongAction(songs[songIndex]);
      setPlayAction(true);
    }
  }

  function playFunc(statusPlay: boolean) {
    setPlayAction(statusPlay);
  }

  function endFunc() {
    // when duration = currentTime
    setPlayAction(false);
  }

  return song && Object.keys(song).length > 0 && (
    <PlayerAudio 
      song={song}
      audioSrc={audioUrl} 
      playStatus={play} 
      playFunc={playFunc}
      endFunc={endFunc}
      next={nextFunc} 
      previous={previousFunc} 
    />
  );
}

const mapStateToProps = ({ song, songs, play }: any) => {
  return {
    songs,
    song,
    play
  }
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    loadSongAction: (song: any) => dispatch(loadSongAction(song)),
    setPlayAction: (status: boolean) => dispatch(setPlayAction(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayControl);
