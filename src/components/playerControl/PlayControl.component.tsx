import React, { useEffect, useState } from 'react';

// components
import PlayerAudio from 'components/playerAudio/PlayerAudio.component';


function PlayControl() {
  const musics = [] as any;

  const [index, setIndex] = useState(-1);
  const [statusPlay, setStatusPlay] = useState(false);

  useEffect(() => {

    return () => { }
  }, [])

  function nextFunc() {
    if (index >= 1) {
      setIndex(1);
    } else {
      setIndex(index + 1);
    }
    setStatusPlay(true);
  }

  function previousFunc() {
    if (index <= 0) {
      setIndex(0);
    } else {
      setIndex(index - 1);
    }
    setStatusPlay(true);
  }

  return (
    <PlayerAudio audioSrc={musics[index] ? musics[index] : ''} status={statusPlay} next={nextFunc} previous={previousFunc} />
  );
}

export default PlayControl;
