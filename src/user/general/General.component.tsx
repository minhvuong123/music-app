import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';

// styles scss
import styles from './general.module.scss';

import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';
import { apiLink } from 'shared/const';
import Song from 'components/song/Song.component';
import Album from 'components/album/Album.component';
import { songType } from 'shared/types';

// ant
import {
  Form,
  Input,
  Modal
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { setSongsAction } from 'shared/redux/actions';


function UserGeneral({ setSongsAction }: any) {
  const token = localStorage.getItem('token') as string;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        const resultSongs = await axios.get(`${apiLink}/songs/user/${decoded._doc._id}`);
        setSongs(resultSongs.data.songs);
        setSongsAction(resultSongs.data.songs);

        const resultAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`);
        setAlbums(resultAlbums.data.albums);
      }
    });
  }, [token]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onFinish(values: any) {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (!err) {
        const resultData = _.cloneDeepWith(values);
        resultData.created_at = moment().toISOString();
        resultData.album_user_id = decoded._doc._id;
        resultData.album_category = '';
        resultData.album_listShow = '';
        resultData.album_url_image ='';
        resultData.album_country = '';

        axios.post(`${apiLink}/albums`, { album: resultData}).then(result => {
          console.log(result);
        });
      }
    });
  };

  return (
    <div className={styles.user_general}>
      <div className={styles.general_song}>
        <h3><a href="/">Bài Hát</a></h3>
        <div className={styles.song_list}>
          {
            songs && songs.map((s: songType) => <Song key={s._id} song={s} />)
          }
        </div>
      </div>
      <div className={styles.general_album}>
        <h3><a href="/">Album</a></h3>
        <div className={styles.album_list}>
          <div onClick={showModal} className={[styles.album_empty, styles.album_item].join(' ')}>
            <span><AiOutlinePlus /></span>
            <span>Tạo album mới</span>
          </div>
          {
            albums && albums.map((album: any) => {
              return (
                <div key={album._id} className={[styles.album_item, styles.margin_left_20].join(' ')}>
                  <Album album={album} />
                </div>
              )
            })
          }
        </div>
      </div>
      <Modal
        title='Tạo album mới'
        width={300}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            album_name: '',
            created_at: ''
          }}
          onFinish={onFinish}
          onFinishFailed={onFinish}
        >
          <Form.Item
            name="album_name"
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <div>
            <button type="submit" className={styles.album_btn}>Confirm</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ isLoading, songs, album, error }: any) => {
  return {
    isLoading, 
    songs, 
    album,
    error
  }
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    setSongsAction: (songs: any) => dispatch(setSongsAction(songs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGeneral);
