import React, { useEffect, useState } from 'react';

// components
import Album from 'components/album/Album.component';

// styles scss
import styles from './main.module.scss';

import axios from 'axios';
import { apiLink } from 'shared/const';
import AlBumList from 'components/albumList/AlbumList.component';

function MainComponent() {
  const [albumsTitle, setAlbumsTitle] = useState<any>([]);

  useEffect(() => {
    async function loadData() {
      const resultAlbumsTitle = await axios.get(`${apiLink}/albumList/status/${true}`);

      for (const [index, AlbumTitle] of resultAlbumsTitle.data.albumList.entries()) {
        const albums = await await axios.get(`${apiLink}/albums/albumlist/${AlbumTitle._id}`);
        resultAlbumsTitle.data.albumList[index].albums = albums.data.albums;
      }

      setAlbumsTitle(resultAlbumsTitle.data.albumList);
    }

    loadData();

    return () => { }
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
      {
        albumsTitle
        && albumsTitle.map((albumTitle: any) => (
          <div className={styles.margin_top_30}>
            <AlBumList
              key={albumTitle._id}
              responsive={responsiveSlide}
              title={albumTitle.albumList_name}>
              <div>
                {
                  albumTitle.albums.map((album: any) => {
                    return (
                      <div key={album._id} className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                        <Album album={album} />
                      </div>
                    )
                  })
                }
              </div>
            </AlBumList>
          </div>
        ))
      }
    </div>
  );
}

export default MainComponent;
