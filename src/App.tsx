import React, { useState } from 'react';

// components
import PlayerAudio from 'components/player/PlayerAudio.component';
import SideBar from 'components/sidebar/SideBar.component';

// antd css
import 'antd/dist/antd.css';

// styles scss
import styles from './app.module.scss';

function App() {
  const musics = [
    'https://vnno-vn-6-tf-mp3-s1-zmp3.zadn.vn/567d2a75fb31126f4b20/5047299516671071615?authen=exp=1612965235~acl=/567d2a75fb31126f4b20/*~hmac=1b49fc30fd77c50a01e5a3445247eb3f&fs=MTYxMjmUsIC5MjQzNTY4OHx3ZWJWNnwwfDQyLjExNC4yMDYdUngMjI5',
    'https://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/e62a67adecea05b45cfb/449341657436324137?authen=exp=1612979640~acl=/e62a67adecea05b45cfb/*~hmac=7bee674897b10e2b69c043ae74b03604&fs=MTYxMjgwNjg0MDk2NXx3ZWJWNnwwfDQyLjExNC4yMDYdUngMjI5'
  ];

  const [index, setIndex] = useState(-1);
  const [statusPlay, setStatusPlay] = useState(false);
  
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
    <div className={styles.app}>
      <SideBar />
      <PlayerAudio audioSrc={musics[index] ? musics[index] : ''} status={statusPlay} next={nextFunc} previous={previousFunc} />
    </div>
  );
}

export default App;
