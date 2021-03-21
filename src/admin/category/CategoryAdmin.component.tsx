import React, { useState } from 'react';

// ant
import {
  Form,
  Input,
  notification
} from 'antd';

import styles from './category-admin.module.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { categoryType } from 'shared/types';

import moment from 'moment';
import UploadComponent from 'shared/components/upload/Upload.component';


function Category({ tabStatus }: any) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [validateUploadImage, setValidateUploadImage] = useState<any>('');
  const [base64Image, setBase64] = useState('');
  const [imageType, setImageType] = useState('');
  const [form] = Form.useForm();

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

  function onFinish(values: any) {
    const resultData = {...values};
    resultData.category_url_image = base64Image;
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/categories`, { category: resultData, imageType: imageType }).then(result => {
      form.resetFields();
      openNotification('topRight');
    })
  }

  return (
    <div className={styles.app_category}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className={styles.control_layout}>
          <Form.Item
            name="category_name"
            label="Name"
            className={styles.control_item}
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="* Image" className={styles.control_item}>
            <UploadComponent
              listType='picture-card'
              showUploadList={true}
              limit={1}
              isSubmit={isSubmit}
              handleChangeImage={handleChangeImage}
            />
            {validateUploadImage ? <span style={{ color: 'red' }}>{validateUploadImage}</span> : null}
          </Form.Item>
        </div>
        <div>
          <button type="submit" className={styles.upload_modal_btn}>Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default Category;
