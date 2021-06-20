import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// components

// assets
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
import { apiLink } from 'shared/const';

// styles scss
import './create-play-list.scss';

// ant
import { Form, Input, Modal, notification } from 'antd';
import { AlbumModel, ComponentModel } from 'shared/model';
import { setCreatePlayList } from 'shared/redux/actions';
import { addUserAlbums } from 'shared/redux/actions/user.action';


function CreatePlayList({ createPlayListStatus, setCreatePlayList, addUserAlbums }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [form] = Form.useForm() as any;
  const [albumName, setAlbumName] = useState('');

  useEffect(() => {
  }, []);

  const handleOk = () => {
    setCreatePlayList(false);
  };

  const handleCancel = () => {
    setCreatePlayList(false);
  };

  function openNotification(placement: any, album_name: string): void {
    notification.success({
      className: "app-notification",
      message:  <div>Bài hát <b>{album_name}</b> được thêm vào Play List thành công !</div>,
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
            setAlbumName('');
            addUserAlbums(result.data.album);
            form.resetFields();
            openNotification('topRight', resultData.album_name);
            setCreatePlayList(false);
          });
        }
      }
    });
  };

  function inputChange(event: any): void {
    setAlbumName(event.target.value);
  }

  return (
    <div className="user__albums">
      <Modal
        title="Tạo playlist mới"
        width={300}
        wrapClassName="create-play-list"
        visible={createPlayListStatus}
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
  );
}

const mapStateToProps = ({ status }: any) => {
  return {
    createPlayListStatus: status.createPlayList
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCreatePlayList: (status: boolean) => dispatch(setCreatePlayList(status)),
    addUserAlbums: (album: AlbumModel) => dispatch(addUserAlbums(album))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayList);
