import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

// styles
import styles from './category-detail.module.scss';
import SlideList from 'components/slideList/slideList.component';
import axios from 'axios';
import { apiLink } from 'shared/const';
import Album from 'components/album/Album.component';

function CategoryAlbumDetail({ location }: any) {
  const { categoryId } = location.state;
  const [albums, setAlbums] = useState<any>([]);

  useEffect(() => {
    axios.get(`${apiLink}/albums/category/${categoryId}`).then(result => {
      if (result && result.data.albums) {
        setAlbums(result.data.albums);
      }
    })
  }, [])

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
    <div className={styles.category_detail}>
      <div className={styles.album_block}>
        <SlideList
          slideSetting={settings}
          title="Nổi Bật">
          <div>
            {
              albums && albums.map((album: any) => {
                return (
                  <div key={album._id} className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                    <Album album={album} />
                  </div>
                )
              })
            }
          </div>
        </SlideList>
      </div>
      <div className={styles.album_block}>
        <SlideList
          slideSetting={settings}
          title="Albums">
          <div>
            {
              albums && albums.map((album: any) => {
                return (
                  <div key={album._id} className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
                    <Album album={album} />
                  </div>
                )
              })
            }
          </div>
        </SlideList>
      </div>
    </div>
  );
}

export default CategoryAlbumDetail;
