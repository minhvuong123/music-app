import React, { useEffect, useState } from 'react';

// components
import PlayerAudio from 'components/player/PlayerAudio.component';
import SideBar from 'components/sidebar/SideBar.component';
import BlockList from 'components/blockList/BlockList.component';

// styles scss
import styles from './app.module.scss';
import ListShow from 'components/listShow/ListShow.component';
import Header from 'components/header/Header.component';
import Admin from 'admin/Admin.component';

import axios from 'axios';
import { apiLink } from 'shared/const';
import MainComponent from 'components/main/Main.component';

function App() {
  const musics = [
    'https://vnno-vn-6-tf-mp3-s1-zmp3.zadn.vn/8abc2e2d896960373978/3799330207337094985?authen=exp=1613553428~acl=/8abc2e2d896960373978/*~hmac=0f5d742f75ca8ec33bb0a67d1f7c3ddf&fs=MTYxMzM4MDYyODM5Nnx3ZWJWNnwxMDEyNzMwNjmUsICyfDEdUngNTUdUngMC41Mg',
    'http://localhost:4000/static/mp3/d893c9c1-6f6b-11eb-84b2-b53dfea0d7d1.mp3'
  ];

  const [songs, setSongs] = useState([]);
  const [index, setIndex] = useState(-1);
  const [statusPlay, setStatusPlay] = useState(false);


  useEffect(() => {
    axios.get(`${apiLink}/songs`).then(result => {
      setSongs(result.data.songs);
    })
    return () => {}
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
    <div className={styles.app}>
      <Admin />
      <div className={styles.app_layout}>
        <SideBar />
        <div className={styles.app_content_wrap}>
          <Header />
          <div className={styles.app_content}>
            <MainComponent />
          </div>
        </div>
      </div>
      <PlayerAudio audioSrc={musics[index] ? musics[index] : ''} status={statusPlay} next={nextFunc} previous={previousFunc} />
    </div>
  );
}

export default App;
