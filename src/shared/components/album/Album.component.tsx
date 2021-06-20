import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// ant design
import {
  HeartOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { IoClose } from "react-icons/io5";

// styles
import './album.scss';
import { apiLink } from 'shared/const';

import album_default from 'images/album_default.png';
import axios from 'axios';
import { AlbumModel, ComponentModel } from 'shared/model';

function Album({ album, updateAlbum, deleteAlbum }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  // const [song, setSong] = useState<any>({});
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (album._id) {
      jwt.verify(token, 'kiwi', async function (err, decoded: any) {
        if (!err) {
          setUser(decoded._doc);
          // axios.get(`${apiLink}/songs/albums/${album!._id}`).then(result => {
          //   // handle to message success
          //   if(result && result.data && result.data.song){
          //     setSong(result.data.song);
          //   }
          // })
        }
      });
    } 
    return () => {}
  }, [album, token])

  function addToAlbum(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const payload = {
      _id: album!._id,
      album_user_id: user._id
    }
    axios.patch(`${apiLink}/albums`, { album: payload }).then(result => { 
      updateAlbum && updateAlbum({ album_user_id: payload.album_user_id });
    })
  }

  function removeFromAlbum(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const payload = {
      _id: album!._id,
      album_user_id: ''
    }
    axios.patch(`${apiLink}/albums`, { album: payload }).then(result => { 
      updateAlbum && updateAlbum({ album_user_id: payload.album_user_id });
    })
  }

  function removeAlbum(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const payload = {
      _id: album!._id,
    }
    axios.post(`${apiLink}/albums/delete`, { album: payload }).then(result => { 
      deleteAlbum && deleteAlbum(payload._id);
    })
  }

  function getToolTipAddOrRemove(album: AlbumModel) {
    if (album && album.album_user_id) {
      return (
        album.album_added === 'admin' 
        ? <Tooltip placement="top" color="#383737" title="Xóa khỏi thư viện">
            <div onClick={removeFromAlbum} className="block__icon block__icon--svg"><HeartOutlined /></div>
          </Tooltip>
        : <Tooltip placement="top" color="#383737" title="Xóa">
            <div onClick={removeAlbum} className="block__icon block__icon--erase"><IoClose /></div>
          </Tooltip>
      );
    }

    return (
      <Tooltip placement="top" color="#383737" title="Thêm vào thư viện">
        <div onClick={addToAlbum} className="block__icon"><HeartOutlined /></div>
      </Tooltip>
    );
  }

  return (
    <div className="block__container">
      <NavLink to={{
        pathname: `/album/${album!.album_slug}`,
        state: { albumId: album!._id }
      }} className="block">
        {
          album!.album_url_image
            ? <div className="block__image">
              <img src={`${apiLink}/${album!.album_url_image}`} alt="music app" />
            </div>
            : <div className="block__image">
              <img src={album_default} alt="" />
            </div>
        }
        <div className="block__opacity"></div>
        <div className="block__actions">
          { getToolTipAddOrRemove(album) }
          <div className="block__icon block__icon--play">
            <PlayCircleOutlined />
          </div>
          <Tooltip placement="top" color="#383737" title="Khác">
            <div className="block__icon"><EllipsisOutlined /></div>
          </Tooltip>
        </div>
      </NavLink>
      <div className="block__name">
        <a href="/" title={album!.album_name}>{album!.album_name}</a>
      </div>
    </div>
  );
}

export default Album;
