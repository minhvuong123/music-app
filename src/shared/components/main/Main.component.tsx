import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import Album from 'shared/components/album/Album.component';
import SlideList from 'shared/components/slideList/slideList.component';
import CategoryAlbum from 'shared/components/category/category.component';

// assets

import axios from 'axios';
import { apiLink } from 'shared/const';

// styles scss
import './main.scss';

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
    <div className="main__container">
      {
        albumsTitle
        && albumsTitle.map((albumTitle: any) => (
          <div key={albumTitle._id} className="mt__30">
            <SlideList
              slideSetting={settings}
              title={albumTitle.albumList_name}>
              <div>
                {
                  albumTitle.albumList_slug !== 'The-Loai'
                   ? albumTitle.albums.map((album: any) => {
                      return (
                        <div key={album._id} className="pl__10 pr__10">
                          <Album album={album} />
                        </div>
                      )
                    })
                  : albumTitle.categories.map((category: any) => {
                    return (
                      <div key={category._id} className="pl__10 pl__10">
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
