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
import { Form, Input, Modal } from 'antd';
import { AiOutlinePlus } from "react-icons/ai";
import Album from 'shared/components/album/album.component';


function UserPlayList() {
  const token = localStorage.getItem('token') as string;
  const [albums, setAlbums] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);


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

        axios.post(`${apiLink}/albums`, { album: resultData }).then(result => {
          // handle to message success
        });
      }
    });
  };
  return (
    <div className="user__playList">
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
                <Album album={album} />
              </div>
            )
          })
        }
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
              <button type="submit" className="album__btn">Confirm</button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default UserPlayList;
