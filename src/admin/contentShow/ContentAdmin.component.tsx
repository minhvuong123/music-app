import React, { useEffect, useState } from 'react';
import { apiLink } from 'shared/const';
import axios from 'axios';

import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";

// scss
import styles from './content-admin.module.scss';
import _ from 'lodash';

function ContentAdmin({ tabStatus }: any) {
  const [albumsDisable, setAlbumsDisable] = useState<any>([]);
  const [albumsEnable, setAlbumsEnable] = useState<any>([]);
  const [status, setStatus] = useState<any>(false);

  useEffect(() => {
    async function loadData() {
      const resultAlbumsDisable = await axios.get(`${apiLink}/albumList/status/${false}`);
      if (resultAlbumsDisable && resultAlbumsDisable.data && resultAlbumsDisable.data.albumList) {
        setAlbumsDisable(resultAlbumsDisable.data.albumList);
      }

      const resultAlbumsEnable = await axios.get(`${apiLink}/albumList/status/${true}`);
      if (resultAlbumsEnable && resultAlbumsEnable.data && resultAlbumsEnable.data.albumList) {
        setAlbumsEnable(resultAlbumsEnable.data.albumList);
      }
    }

    loadData();

    return () => { }
  }, [tabStatus]);

  function handleAlbumAdd(albumt: any) {
    const albumsT = albumsDisable.filter((album: any) => album._id !== albumt._id);
    setAlbumsDisable(albumsT);

    const albumsS = _.cloneDeepWith(albumsEnable)
    albumt.albumList_status = true;
    albumsS.push(albumt);
    setAlbumsEnable(albumsS);
  }

  function handleAlbumARemove(albumt: any) {
    const albumsS = albumsEnable.filter((album: any) => album._id !== albumt._id);
    setAlbumsEnable(albumsS);

    const albumsT = _.cloneDeepWith(albumsDisable);
    albumt.albumList_status = false;
    albumsT.push(albumt);
    setAlbumsDisable(albumsT);
  }

  function handleShowUI() {
    // eslint-disable-next-line array-callback-return
    const payLoad = [...albumsEnable, ...albumsDisable].map(album => {
      return {
        _id: album._id,
        albumList_status: album.albumList_status
      }
    })

    axios.patch(`${apiLink}/albumList/status`, { albums: payLoad }).then(result => {
      // handle to success message
    })
  }

  return (
    <div className={styles.app_content}>
      <div className={styles.content_container}>
        <div className={styles.content_left}>
          <h3 className={styles.title}>Display Albums</h3>
          <div className={styles.albums}>
            {
              albumsEnable && albumsEnable.map((albums: any) => (
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
              albumsDisable && albumsDisable.map((albumt: any) => (
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
      <div className={styles.actions}>
        <div onClick={handleShowUI} className={[styles.btn_apply, `${status ? styles.disable : ''}`].join(' ')}>
          Apply
        </div>
      </div>
    </div>
  );
}

export default ContentAdmin;
