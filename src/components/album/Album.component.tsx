import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// ant design
import {
  HeartOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

// styles
import styles from './album.module.scss';
import { apiLink } from 'shared/const';


function Album({ album }: any) {
  const token = localStorage.getItem('token') as string;
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        setUser(decoded._doc);
      }
    });
  }, [token])

  function playSong(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className={styles.block_list_container}>
      <NavLink to={`/album/${album.album_slug}`} className={styles.block_list}>
        {
          album.album_url_image
          ? <div className={styles.block_list_image}>
            <img src={`${apiLink}/${album.album_url_image}`} alt="music app" />
          </div>
          : <div className={styles.block_list_image}> </div>
        }
        <div className={styles.list_opacity}></div>
        <div className={styles.block_list_action}>
          <Tooltip placement="top" color="#383737" title="Thêm vào thư viện">
            <div className={styles.list_icon}><HeartOutlined /></div>
          </Tooltip>
          <div onClick={playSong} className={[styles.list_play, styles.list_icon].join(' ')}>
            <PlayCircleOutlined />
          </div>
          <Tooltip placement="top" color="#383737" title="Khác">
            <div className={styles.list_icon}><EllipsisOutlined /></div>
          </Tooltip>
        </div>
      </NavLink>
      <div className={styles.block_list_name}>
        <a href="/" title={album.album_name}>{album.album_name}</a>
      </div>
    </div>
  );
}

export default Album;
