import React, { useEffect, useState } from 'react';

// components
import PlayerAudio from 'components/player/PlayerAudio.component';
import SideBar from 'components/sidebar/SideBar.component';
import BlockSong from 'components/blockSong/BlockSong.component';

// styles scss
import styles from './app.module.scss';
import ListShow from 'components/listShow/ListShow.component';
import Header from 'components/header/Header.component';

import axios from 'axios';
import { apiLink } from 'shared/const';

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

  // const list = (
  //   <>
  //     <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
  //       <BlockSong />
  //     </div>
  //     <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
  //       <BlockSong />
  //     </div>
  //     <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
  //       <BlockSong />
  //     </div>
  //     <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
  //       <BlockSong />
  //     </div>
  //     <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
  //       <BlockSong />
  //     </div>
  //     <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
  //       <BlockSong />
  //     </div>
  //   </>
  // )

  // const responsiveSlide = [
  //   {
  //     breakpoint: 1300,
  //     settings: {
  //       slidesToShow: 5,
  //       slidesToScroll: 1
  //     }
  //   },
  //   {
  //     breakpoint: 1224,
  //     settings: {
  //       slidesToShow: 4,
  //       slidesToScroll: 1
  //     }
  //   }
  // ]
  return (
    <div className={styles.app}>
      <div className={styles.app_layout}>
        <SideBar />
        <div className={styles.app_content_wrap}>
          <Header />
          <div className={styles.app_content}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {
                songs && songs.map((song: any) => {
                  return (
                    <div key={song._id} style={{width: '20%', padding: '10px'}}>
                      <BlockSong song={song} />
                    </div>
                  )
                })
              }
            </div>
            {/* -------------- */}
            {/* <ListShow responsive={responsiveSlide} title="Âm Nhạc Dành Cho Bạn">
              {list}
            </ListShow> */}

            {/* ------------------- */}
            {/* <ListShow responsive={responsiveSlide} title="Nghe Gần Đây">
              <>
                <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                  <BlockSong />
                </div>
              </>
            </ListShow> */}

            {/* ------------------------ */}
            {/* <ListShow responsive={responsiveSlide} title="Radio Nổi Bật">
              { list }
            </ListShow> */}
          </div>
        </div>
      </div>
      <PlayerAudio audioSrc={musics[index] ? musics[index] : ''} status={statusPlay} next={nextFunc} previous={previousFunc} />
    </div>
  );
}

export default App;
