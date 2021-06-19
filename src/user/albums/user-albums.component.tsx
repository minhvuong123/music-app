import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// components

// assets
import _ from 'lodash';
import axios from 'axios';
import { apiLink } from 'shared/const';

// styles scss
import './user-albums.scss';

// ant
import { AiOutlinePlus } from "react-icons/ai";
import CategoryAlbumComponent from 'shared/components/category-album/category-album.component';
import { AlbumModel, ComponentModel } from 'shared/model';
import { setCreatePlayList } from 'shared/redux/actions';


function UserPlayList({ createPlayListStatus, setCreatePlayList } : ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [albums, setAlbums] = useState([] as AlbumModel[]);

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        const resultAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`);
        setAlbums(resultAlbums.data.albums);
      }
    });
  }, [token]);

  const showModal = () => {
    setCreatePlayList(true);
  };


  function updateAlbum(_id: string, payLoad: AlbumModel): void {
    const albumsUpdate = _.cloneDeepWith(albums).filter((album: AlbumModel) => album._id !== _id) as AlbumModel[];

    setAlbums(albumsUpdate);
  }

  function deleteAlbum(_id: string): void {
    const albumsUpdate = _.cloneDeepWith(albums).filter((album: AlbumModel) => album._id !== _id) as AlbumModel[];

    setAlbums(albumsUpdate);
  }

  return (
    <div className="user__albums">
      <div className="title">
        <span>Albums</span>
      </div>
      <div className="albums">
        <div onClick={showModal} className="empty item">
          <span><AiOutlinePlus /></span>
          <span>Tạo album mới</span>
        </div>
        {
          albums && albums.map((album: any) => {
            return (
              <div key={album._id} className="item ml__20">
               <CategoryAlbumComponent key={album._id} album={album} updateAlbum={updateAlbum} deleteAlbum={deleteAlbum} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch: any) => {
  return {
    setCreatePlayList: (status: boolean) => dispatch(setCreatePlayList(status))
  }
}

export default connect(null, mapDispatchToProps)(UserPlayList);
