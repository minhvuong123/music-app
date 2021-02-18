import React, { useEffect, useState } from 'react';

// components
import BlockList from 'components/blockList/BlockList.component';

// styles scss
import styles from './main.module.scss';

import axios from 'axios';
import { apiLink } from 'shared/const';
import ListShow from 'components/listShow/ListShow.component';

function MainComponent() {
  const [playLists, setPlayLists] = useState<any>([]);

  useEffect(() => {
    axios.get(`${apiLink}/playLists`).then(result => {
      setPlayLists(result.data.playLists);
    })
    return () => {}
  }, [])

  const responsiveSlide = [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1224,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }
  ]
  return (
    <div className={styles.app_main}>
      <ListShow 
        responsive={responsiveSlide} 
        title={playLists[0] && playLists[0].playList_listShow.playListShow_name}>
        <div>
          {
            playLists && playLists.map((playList: any) => { 
              return (
                <div key={playList._id} className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                  <BlockList playList={playList} /> 
                </div>
            )})
          }
        </div>
      </ListShow>
      {/* <div className={styles.app_main_block}>
          <div className={styles.block_item}>
            <BlockList listSong={song} />
          </div>
      </div> */}
    </div>
  );
}

export default MainComponent;
