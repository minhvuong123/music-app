import React, { useEffect, useState } from 'react';

// ant
import {
  Form,
  Input,
  Select,
  notification
} from 'antd';

import UploadComponent from 'components/upload/Upload.component';

import styles from './play-list.module.scss';
import { apiLink } from 'shared/const';
import axios from 'axios';
import moment from 'moment';
import { categoryType, countryType, PlayListShowType, playListType } from 'shared/types';

const { Option } = Select;

function PlayListAdmin({ tabStatus }: any) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [listShows, setListShows] = useState([]);
  const [validateUploadImage, setValidateUploadImage] = useState<any>('');
  const [base64Image, setBase64] = useState('');
  const [imageType, setImageType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    async function loadData() {
      const resultCategory = await axios.get(`${apiLink}/categories`);
      if (resultCategory && resultCategory.data && resultCategory.data.categories) {
        setCategories(resultCategory.data.categories);
      }

      const resultCountry = await axios.get(`${apiLink}/countries`);
      if (resultCountry && resultCountry.data && resultCountry.data.countries) {
        setCountries(resultCountry.data.countries);
      }

      const resultPlayListShow = await axios.get(`${apiLink}/playListShows`);
      if (resultPlayListShow && resultPlayListShow.data && resultPlayListShow.data.playListShows) {
        setListShows(resultPlayListShow.data.playListShows);
      }
    }

    loadData();

    return () => {}
  }, [tabStatus]);

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

  function onFinish(values: playListType) {
    const resultData = {...values};
    resultData.playList_url_image = base64Image;
    resultData.created_at = moment().toISOString();
    
    axios.post(`${apiLink}/playLists`, { playList: resultData, imageType: imageType }).then(result => {
      setIsSubmit(!isSubmit);
      form.resetFields();
      openNotification('topRight');
    })
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          playList_name: '',
          playList_category: '',
          playList_country: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className={styles.control_layout}>
          <Form.Item
            name="playList_name"
            label="Name"
            className={styles.control_item}
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="playList_category"
            label="Types"
            className={styles.control_item}
            rules={[{ required: true, message: 'Type is not empty!' }]}
          >
            <Select>
              { categories && categories.map((c: categoryType)  => <Option key={c._id} value={c._id}>{c.category_name}</Option>) }
            </Select>
          </Form.Item>
        </div>
        <div className={styles.control_layout}>
          <Form.Item
            name="playList_country"
            label="Country"
            className={styles.control_item}
            rules={[{ required: true, message: 'Type is not empty!' }]}
          >
            <Select>
              { countries && countries.map((c: countryType) => <Option key={c._id} value={c._id}>{c.country_name}</Option>) }
            </Select>
          </Form.Item>
          <Form.Item
            name="playList_listShow"
            label="List Show"
            className={styles.control_item}
            rules={[{ required: true, message: 'List Show is not empty!' }]}
          >
            <Select>
              { listShows && listShows.map((l: PlayListShowType) => <Option key={l._id} value={l._id}>{l.playListShow_name}</Option>) }
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
        </div>
        <div>
          <button type="submit" className={[styles.upload_modal_btn, styles.margin_left_10].join(' ')}>Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default PlayListAdmin;
