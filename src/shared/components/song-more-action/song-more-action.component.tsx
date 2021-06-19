import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// ant
import { EllipsisOutlined } from '@ant-design/icons';
import { Popover, Input, notification } from 'antd';

import { AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

// assets
import { apiLink } from 'shared/const';
import axios from 'axios';
import { setCreatePlayList } from 'shared/redux/actions';

// scss
import './song-more-action.scss';
import { AlbumModel, ComponentModel, SongModel } from 'shared/model';
import { convertSingers } from 'shared/converter';
import { setUserAlbums } from 'shared/redux/actions/user.action';
import _ from 'lodash';

function SongMoreAction({ song, setCreatePlayList, userAlbums, setUserAlbums }: ComponentModel) {
  const [currentAlbums, setCurrentAlbum] = useState([] as AlbumModel[]);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {

    const userAlbumsLocalStore = JSON.parse(localStorage.getItem('userAlbums') as string);
    if (_.isEmpty(userAlbums) && userAlbumsLocalStore) {
      setUserAlbums(userAlbumsLocalStore);
      setCurrentAlbum(userAlbumsLocalStore);
    }

    setCurrentAlbum(userAlbums as AlbumModel[]);

  }, [song, userAlbums, setUserAlbums])

  function openNotification(placement: any, song_name: string): void {
    notification.success({
      className: "app-notification",
      message: <div>Bài hát <b>{song_name}</b> được thêm vào Play List thành công !</div>,
      placement,
      duration: 1
    });
  };

  function handleVisibleChange(visible: boolean) {
    setVisible(visible);
  };

  function handleAddSongToAlbum(albumId: string, songId: string) {
    const payLoad = {
      _id: songId,
      song_id_albums: albumId
    }
    axios.patch(`${apiLink}/songs`, { song: payLoad }).then(result => {
      if (result.data.status === 'ok') {
        openNotification('topRight', song.song_name);
      }
    })
  }

  function showCreatePlayListForm(): void {
    setCreatePlayList(true);
  }

  function onChangeSearchInput(event: any): void {
    const { value } = event.target;
    const result = (userAlbums as AlbumModel[]).filter(album => album.album_name?.toLowerCase().includes(value.toLowerCase()));

    setSearchText(event.target.value);
    setCurrentAlbum(result);
  }

  function content(currentSong: SongModel) {
    return (
      <div className="song__more">
        <div className="song__info">
          <div className="song__image">
            <img src={`${apiLink}/${currentSong.song_url_image}`} alt="" />
          </div>
          <div className="song__text">
            <span className="name name--song">{currentSong.song_name}</span>
            <span className="name">{convertSingers(currentSong.song_singer)}</span>
          </div>
        </div>
        <div className="song__actions">
          <div className="action__item">
            <span><AiOutlinePlus /> Thêm vào play list </span> <AiOutlineRight />
            <div className="popup">
              <ul className="menu-list">
                <li className="search-box">
                  <Input type="text" value={searchText} onChange={onChangeSearchInput} placeholder="Tìm playlist" />
                </li>
                <li className="init-play-list">
                  <span className="init-icon"><IoAddOutline /></span>
                  <span onClick={showCreatePlayListForm} className="init-text">Tạo playlist mới</span>
                </li>
              </ul>
              <div className="play__list">
                {
                  currentAlbums && currentAlbums.map((album: any) => (
                    <div key={album._id} onClick={() => handleAddSongToAlbum(album._id, currentSong._id)} className="item">
                      <span className="init-icon"><BsMusicNoteList /></span>
                      <span className="init-text">{album.album_name}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <Popover 
      content={content(song)}
      placement="leftTop" 
      trigger="click" visible={visible}
      onVisibleChange={handleVisibleChange} 
      getPopupContainer={() => document.getElementsByClassName('action__btn')[0] as any}
    >
      <EllipsisOutlined />
    </Popover>
  )
}

const mapStateToProps = ({ status, user }: any) => {
  return {
    createPlayListStatus: status.createPlayList,
    userAlbums: user.albums
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCreatePlayList: (status: boolean) => dispatch(setCreatePlayList(status)),
    setUserAlbums: (albums: AlbumModel[]) => dispatch(setUserAlbums(albums))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongMoreAction);