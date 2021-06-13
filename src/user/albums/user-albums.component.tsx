import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

// components

// assets
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
import { apiLink } from 'shared/const';

// styles scss
import './user-albums.scss';

// ant
import { Form, Input, Modal, notification } from 'antd';
import { AiOutlinePlus } from "react-icons/ai";
import CategoryAlbumComponent from 'shared/components/category-album/category-album.component';
import { AlbumModel } from 'shared/model';


function UserPlayList() {
  const token = localStorage.getItem('token') as string;
  const [albums, setAlbums] = useState([] as AlbumModel[]);
  const [form] = Form.useForm() as any;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [albumName, setAlbumName] = useState('');

  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
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

  function openNotification(placement: any){
    notification.success({
      className: "app-notification",
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function onFinish(values: any) {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (!err) {
        const resultData = _.cloneDeepWith(values);
        resultData.created_at = moment().toISOString();
        resultData.album_user_id = decoded._doc._id;
        resultData.album_category = '';
        resultData.album_listShow = '';
        resultData.album_url_image = '';
        resultData.album_country = '';
        resultData.album_added = 'user';

        if (resultData.album_name) {
          axios.post(`${apiLink}/albums`, { album: resultData }).then(result => {
            const currentAlbums = _.cloneDeepWith(albums) as AlbumModel[];
            currentAlbums.push(result.data.album);
            setAlbums(currentAlbums);
            form.resetFields();
            openNotification('topRight');
            setIsModalVisible(false);
          });
        }
      }
    });
  };

  function updateAlbum(_id: string, payLoad: AlbumModel): void {
    const albumsUpdate = _.cloneDeepWith(albums).filter((album: AlbumModel) => album._id !== _id) as AlbumModel[];

    setAlbums(albumsUpdate);
  }

  function deleteAlbum(_id: string): void {
    const albumsUpdate = _.cloneDeepWith(albums).filter((album: AlbumModel) => album._id !== _id) as AlbumModel[];

    setAlbums(albumsUpdate);
  }

  function inputChange(event: any): void {
    setAlbumName(event.target.value);
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
        <Modal
          title="Tạo playlist mới"
          width={300}
          wrapClassName="create-play-list"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
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
            <Form.Item name="album_name">
              <Input className="create-input-form" onChange={inputChange} placeholder="Nhập tên playlist" autoComplete="off" />
            </Form.Item >
            <div className="create-action">
              <button type="submit" className={`album__btn ${albumName ? "active" : ""}`}>Tạo mới</button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default UserPlayList;
