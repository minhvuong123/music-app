import React, { useEffect, useState } from 'react';
import { apiLink } from 'shared/const';
import axios from 'axios';

import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";

// scss
import styles from './content-admin.module.scss';
import _ from 'lodash';

function ContentAdmin({ tabStatus }: any) {
  const [albumTitle, setAlbumTitle] = useState<any>([]);
  const [albumShow, setAlbumShow] = useState<any>([]);

  useEffect(() => {
    async function loadData() {
      const resultAlbumsTitle = await axios.get(`${apiLink}/albumList`);
      if (resultAlbumsTitle && resultAlbumsTitle.data && resultAlbumsTitle.data.albumList) {
        setAlbumTitle(resultAlbumsTitle.data.albumList);
      }
    }

    loadData();

    return () => { }
  }, [tabStatus]);

  function handleAlbumAdd(albumt: any) {
    const albumsT = albumTitle.filter((album: any) => album._id !== albumt._id);
    setAlbumTitle(albumsT);
    const albumsS = _.cloneDeepWith(albumShow)
    albumsS.push(albumt);
    setAlbumShow(albumsS);
  }

  function handleAlbumARemove(albumt: any) {
    const albumsS = albumShow.filter((album: any) => album._id !== albumt._id);
    setAlbumShow(albumsS);
    const albumsT = _.cloneDeepWith(albumTitle);
    albumsT.push(albumt);
    setAlbumTitle(albumsT);
  }

  return (
    <div className={styles.app_content}>
      <div className={styles.content_left}>
        <h3 className={styles.title}>Display Albums</h3>
        <div className={styles.albums}>
          {
            albumShow && albumShow.map((albums: any) => (
              <div
                key={albums._id}
                onClick={() => handleAlbumARemove(albums)}
                className={styles.albums_item}
              >
                {albums.albumList_name}
                <div className={styles.btn_add}><AiOutlineLine /></div>
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.content_right}>
        <h3 className={styles.title}>Available Albums</h3>
        <div className={styles.available}>
          {
            albumTitle && albumTitle.map((albumt: any) => (
              <div
                key={albumt._id}
                onClick={() => handleAlbumAdd(albumt)}
                className={styles.avaible_item}
              >
                {albumt.albumList_name}
                <div className={styles.btn_add}><AiOutlinePlus /></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default ContentAdmin;
