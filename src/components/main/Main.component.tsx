import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import Album from 'components/album/Album.component';

// styles scss
import styles from './main.module.scss';

import axios from 'axios';
import { apiLink } from 'shared/const';
import SlideList from 'components/slideList/slideList.component';
import CategoryAlbum from 'components/category/category.component';

function MainComponent({ contentStatus }: any) {
  const [albumsTitle, setAlbumsTitle] = useState<any>([]);

  useEffect(() => {
    async function loadData() {
      const resultAlbumsTitle = await axios.get(`${apiLink}/albumList/status/${true}`);

      for (const [index, AlbumTitle] of resultAlbumsTitle.data.albumList.entries()) {
        if(AlbumTitle.albumList_slug === 'The-Loai') {
          const categories = await axios.get(`${apiLink}/categories`);
          resultAlbumsTitle.data.albumList[index].albums = [];
          resultAlbumsTitle.data.albumList[index].categories = categories.data.categories;
        } else {
          const albums = await axios.get(`${apiLink}/albums/albumlist/${AlbumTitle._id}`);
          resultAlbumsTitle.data.albumList[index].albums = albums.data.albums;
        }
      }

      setAlbumsTitle(resultAlbumsTitle.data.albumList);
    }

    loadData();

    return () => { }
  }, [contentStatus])

  const settings = {
    responsive: [
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
  };
  return (
    <div className={styles.app_main}>
      {
        albumsTitle
        && albumsTitle.map((albumTitle: any) => (
          <div key={albumTitle._id} className={styles.margin_top_30}>
            <SlideList
              slideSetting={settings}
              title={albumTitle.albumList_name}>
              <div>
                {
                  albumTitle.albumList_slug !== 'The-Loai'
                   ? albumTitle.albums.map((album: any) => {
                      return (
                        <div key={album._id} className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                          <Album album={album} />
                        </div>
                      )
                    })
                  : albumTitle.categories.map((category: any) => {
                    return (
                      <div key={category._id} className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                        <CategoryAlbum category={category} />
                      </div>
                    )
                  })
                }
              </div>
            </SlideList>
          </div>
        ))
      }
    </div>
  );
}

const mapStateToProps = ({ status }: any) => {
  return {
    contentStatus: status.contentStatus
  }
}

export default connect(mapStateToProps, null)(MainComponent);
