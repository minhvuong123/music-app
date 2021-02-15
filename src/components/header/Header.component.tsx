import React, { useState } from 'react';

// ant
import {
  Modal,
  Form,
  Input
} from 'antd';
import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons';

import styles from './header.module.scss';
import UploadComponent from 'components/upload/Upload.component';


import axios from 'axios';
import moment from 'moment';
import { apiLink } from 'shared/const';

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [base64Image, setBase64] = useState('');
  const [imageType, setImageType] = useState('');
  const [base64MP3, setBase64MP3] = useState('');
  const [mp3Type, setMp3Type] = useState('');
  const [validateUploadImage, setValidateUploadImage] = useState<any>('');
  const [validateUploadMP3, setValidateUploadMP3] = useState<any>('');
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    setIsSubmit(!isSubmit);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChangeImage(base64Result: string, type: string) {
    setBase64(base64Result);
    setImageType(type);
    if (!base64Result) {
      setValidateUploadImage('Images is not empty!');
    }  else {
      setValidateUploadImage('');
    }
  }

  function handleChangeMP3(base64Result: string, type: string) {
    setBase64MP3(base64Result);
    setMp3Type(type);
    if (!base64Result) {
      setValidateUploadMP3('MP3 is not empty!');
    } else {
      setValidateUploadMP3('');
    }
  }

  function onFinish(results: any) {
    results['errorFields'] = [];
    if (!base64Image) {
      results['errorFields'].push({
        errors: ["Images is not empty!"],
        name: ["song_url_image"]
      });
      setValidateUploadImage('Images is not empty!');
    }
    if (!base64MP3) {
      results['errorFields'].push({
        errors: ["MP3 is not empty!"],
        name: ["song_url_music"]
      });
      setValidateUploadMP3('MP3 is not empty!');
    }
    if (results.errorFields && results.errorFields.length === 0) {
      delete results['errorFields'];
    }
    if (!results.errorFields) {
      const resultData = {...results};
      resultData.song_url_image = base64Image;
      resultData.song_url_music = base64MP3;
      resultData.song_id_playlist = '';
      resultData.created_at = moment().toISOString();

      axios.post(`${apiLink}/songs`, {song: resultData, imageType: imageType, mp3Type: mp3Type }).then(result => {
        setIsSubmit(!isSubmit);
        setBase64('');
        setBase64MP3('');
        form.resetFields();
      })
    }
     
  };



  // ------------------------- PlayList
  const [isModalVisiblePlayLIst, setIsModalVisiblePlayLIst] = useState(false);
  const handleCancelPlayList = () => {
    setIsModalVisiblePlayLIst(false);
  };
  const showModalPlayList = () => {
    setIsModalVisiblePlayLIst(true);
  };
  function onFinishPlayList(values: Object) {
    console.log(values)
  }

  return (
    <div className={styles.header_app}>
      <div className={styles.arrow}>
        <div className={styles.arrow_left}><LeftOutlined /></div>
        <div className={styles.arrow_right}><RightOutlined /></div>
      </div>
      <div className={styles.header_search}>
        <div className={styles.search_icon}>
          <SearchOutlined />
        </div>
        <div className={styles.search_input}>
          <input type="text" placeholder="Nhập tên bài hát, Nghệ sĩ hoặc MV..." />
        </div>
      </div>
      <div className={styles.header_right}>
      <div className={styles.upload}>
          <div className={styles.upload_btn} onClick={showModalPlayList}><UploadOutlined /></div>
          <Modal
            title="Create Play List"
            visible={isModalVisiblePlayLIst}
            onCancel={handleCancelPlayList}
            footer={null}
          >
            <Form
              layout="vertical"
              initialValues={{
                playList_name: '',
                playList_type: '',
                created_at: ''
              }}
              onFinish={onFinishPlayList}
            >
              <div className={styles.control_layout}>
                <Form.Item 
                  name="playList_name" 
                  label="Play List Name" 
                  className={styles.control_item}
                  rules={[{ required: true, message: 'Name is not empty!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item 
                  name="playList_type" 
                  label="Play List Type" 
                  className={styles.control_item}
                  rules={[{ required: true, message: 'Type is not empty!' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <button onClick={handleCancelPlayList} className={styles.upload_modal_btn}>Cancel</button>
                <button type="submit" className={[styles.upload_modal_btn, styles.margin_left_10].join(' ')}>Confirm</button>
              </div>
            </Form>
          </Modal>
        </div>
        {/* --------------------------------------- */}
        <div className={styles.upload}>
          <div className={styles.upload_btn} onClick={showModal}><UploadOutlined /></div>
          <Modal
            title="Upload song"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                song_name: '',
                song_singer: '',
                song_url_image: '',
                song_url_music: '',
                song_id_playlist: '',
                created_at: ''
              }}
              onFinish={onFinish}
              onFinishFailed={onFinish}
            >
              <div className={styles.control_layout}>
                <Form.Item 
                  name="song_name" 
                  label="Song Name" 
                  className={styles.control_item}
                  rules={[{ required: true, message: 'Name is not empty!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item 
                  name="song_singer" 
                  label="Song Singer" 
                  className={styles.control_item}
                  rules={[{ required: true, message: 'Singer is not empty!' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={styles.control_layout}>
                <Form.Item label="* Song Image" className={styles.control_item}>
                  <UploadComponent 
                    limit={1}
                    isSubmit={isSubmit} 
                    handleChangeImage={handleChangeImage} 
                  />
                  { validateUploadImage ? <span style={{color: 'red'}}>{validateUploadImage}</span> : null }
                </Form.Item>
                <Form.Item label="* Song MP3" className={styles.control_item}>
                  <UploadComponent 
                    limit={1} 
                    isSubmit={isSubmit} 
                    handleChangeImage={handleChangeMP3} 
                  />
                  { validateUploadMP3 ? <span style={{color: 'red'}}>{validateUploadMP3}</span> : null }
                </Form.Item>
              </div>
              <div>
                <button onClick={handleCancel} className={styles.upload_modal_btn}>Cancel</button>
                <button type="submit" className={[styles.upload_modal_btn, styles.margin_left_10].join(' ')}>Confirm</button>
              </div>
            </Form>
          </Modal>
        </div>
        <div className={styles.user}><UserOutlined /></div>
      </div>
    </div>
  );
}

export default Header;
