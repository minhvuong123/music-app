import React, { useEffect, useState } from 'react';

// components
import Album from 'components/album/Album.component';

// styles scss
import styles from './main.module.scss';

import axios from 'axios';
import { apiLink } from 'shared/const';
import ListShow from 'components/listShow/ListShow.component';

function MainComponent() {
  const [albums, setAlbums] = useState<any>([]);

  useEffect(() => {
    axios.get(`${apiLink}/playLists`).then(result => {
      setAlbums(result.data.playLists);
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
        title={albums[0] && albums[0].playList_listShow.playListShow_name}>
        <div>
          {
            albums && albums.map((album: any) => { 
              return (
                <div key={album._id} className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                  <Album album={album} /> 
                </div>
            )})
          }
        </div>
      </ListShow>
    </div>
  );
}

export default MainComponent;
