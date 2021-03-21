import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// components
import SlideList from 'shared/components/slideList/slideList.component';
import Album from 'shared/components/album/Album.component';
import PlayListSong from 'shared/components/playListSong/PlayListSong.component';

// assets
import axios from 'axios';
import { apiLink } from 'shared/const';
import { setSongsAction } from 'shared/redux/actions';

// styles
import './category-detail.scss';

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
    <div className="category__detail">
      <div className="block">
        <SlideList
          slideSetting={settings}
          title="Nổi Bật">
          <div>
            {
              albums && albums.map((album: any) => {
                return (
                  <div key={album._id} className="pl__10 pr__10">
                    <Album album={album} />
                  </div>
                )
              })
            }
          </div>
        </SlideList>
      </div>
      <div className="block">
        <h3 className="block__title">Hot Songs</h3>
        <div className="block__container">
          {
            songs
            && songs.map((s: any) => (
              <div key={s._id} className="item">
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
