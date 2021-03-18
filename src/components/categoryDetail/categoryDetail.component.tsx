import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// styles
import styles from './category-detail.module.scss';
import SlideList from 'components/slideList/slideList.component';
import axios from 'axios';
import { apiLink } from 'shared/const';
import Album from 'components/album/Album.component';
import PlayListSong from 'components/playListSong/PlayListSong.component';
import { setSongsAction } from 'shared/redux/actions';

function CategoryAlbumDetail({ location, setSongsAction }: any) {
  const { categoryId } = location.state;
  const [albums, setAlbums] = useState<any>([]);
  const [songs, setSongs] = useState<any>([]);

  useEffect(() => {
    async function loadData() {
      const resultAlbums = await axios.get(`${apiLink}/albums/category/${categoryId}`);
      if (resultAlbums && resultAlbums.data.albums) {
        setAlbums(resultAlbums.data.albums);
      }

      const resultSongs = await axios.get(`${apiLink}/songs/category/${categoryId}`);
      if (resultSongs && resultSongs.data.songs) {
        setSongs(resultSongs.data.songs);
      }
    }


    loadData();

  }, [categoryId])

  function callBackPlaySong() {
    setSongsAction(songs);
  }

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
        <h3 className={styles.title}>Hot Songs</h3>
        <div className={styles.block_container}>
          {
            songs
            && songs.map((s: any) => (
              <div key={s._id} className={styles.block_item}>
                <PlayListSong song={s} callBackPlaySong={callBackPlaySong}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch: any) => {
  return {
    setSongsAction: (songs: string) => dispatch(setSongsAction(songs))
  }
}

export default connect(null, mapDispatchToProps)(CategoryAlbumDetail);
