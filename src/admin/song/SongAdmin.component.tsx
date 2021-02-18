import React, { useEffect, useState } from 'react';

// ant
import {
  Form,
  Input,
  Select,
  notification
} from 'antd';

import UploadComponent from 'components/upload/Upload.component';

import styles from './song-admin.module.scss';
import { apiLink } from 'shared/const';
import { countryType, singerType } from 'shared/types';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

function SongAdmin({ tabStatus }: any) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [base64Image, setBase64] = useState('');
  const [imageType, setImageType] = useState('');
  const [base64MP3, setBase64MP3] = useState('');
  const [mp3Type, setMp3Type] = useState('');
  const [validateUploadImage, setValidateUploadImage] = useState<any>('');
  const [validateUploadMP3, setValidateUploadMP3] = useState<any>('');
  const [singers, setSingers] = useState<any>([]);
  const [countries, setcountries] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    
    async function loadData() {
      const resultSinger = await axios.get(`${apiLink}/singers`);
      if (resultSinger && resultSinger.data && resultSinger.data.singers) {
        const singerResult = [] as any;
        resultSinger.data.singers.forEach((singer: singerType) => {
          singerResult.push(<Option key={singer._id} value={singer._id}>{singer.singer_name}</Option>);
        })
        setSingers(singerResult);
      }
      
      const resultCountry = await axios.get(`${apiLink}/countries`);
      if (resultCountry && resultCountry.data && resultCountry.data.countries) {
        setcountries(resultCountry.data.countries);
      }
    }

    loadData();

    return () => {}
  }, [tabStatus])

  function openNotification(placement: any){
    notification.success({
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function handleChangeImage(base64Result: string, type: string) {
    setBase64(base64Result);
    setImageType(type);
    if (!base64Result) {
      setValidateUploadImage('Images is not empty!');
    } else {
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
      const resultData = { ...results };
      resultData.song_url_image = base64Image;
      resultData.song_url_music = base64MP3;
      resultData.song_id_playlist = '';
      resultData.created_at = moment().toISOString();
 
      axios.post(`${apiLink}/songs`, { song: resultData, imageType: imageType, mp3Type: mp3Type }).then(result => {
        setIsSubmit(!isSubmit);
        setBase64('');
        setBase64MP3('');
        form.resetFields();
        openNotification('topRight');
      })
    }

  };

  return (
    <div className={styles.app_category}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          song_name: '',
          song_singer: [],
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
            label="Name"
            className={styles.control_item}
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="song_singer"
            label="Singer"
            className={styles.control_item}
            rules={[{ required: true, message: 'Singer is not empty!' }]}
          >
            <Select mode="tags">
              { singers }
            </Select>
          </Form.Item>
        </div>
        <div className={styles.control_layout}>
          <Form.Item
            name="song_country"
            label="Country"
            className={styles.control_item}
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Select>
              { countries && countries.map((c: countryType) => <Option key={c._id} value={c._id}>{c.country_name}</Option>) }
            </Select>
          </Form.Item>
        </div>
        <div className={styles.control_layout}>
          <Form.Item label="* Image" className={styles.control_item}>
            <UploadComponent
              limit={1}
              isSubmit={isSubmit}
              handleChangeImage={handleChangeImage}
            />
            {validateUploadImage ? <span style={{ color: 'red' }}>{validateUploadImage}</span> : null}
          </Form.Item>
          <Form.Item label="* MP3" className={styles.control_item}>
            <UploadComponent
              limit={1}
              isSubmit={isSubmit}
              handleChangeImage={handleChangeMP3}
            />
            {validateUploadMP3 ? <span style={{ color: 'red' }}>{validateUploadMP3}</span> : null}
          </Form.Item>
        </div>
        <div>
          <button type="submit" className={[styles.upload_modal_btn, styles.margin_left_10].join(' ')}>Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default SongAdmin;
