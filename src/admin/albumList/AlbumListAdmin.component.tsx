import React from 'react';

// ant
import {
  Form,
  Input,
  notification
} from 'antd';

import styles from './album-list-admin.module.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { albumListType } from 'shared/types';

import moment from 'moment';


function AlBumListAdmin({ tabStatus }: any) {
  const [form] = Form.useForm();

  function openNotification(placement: any){
    notification.success({
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function onFinish(values: albumListType) {
    const resultData = {...values};
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/albumList`, { albumList: resultData }).then(result => {
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
          albumList_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className={styles.control_layout}>
          <Form.Item
            name="albumList_name"
            label="Name"
            className={styles.control_item}
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <button type="submit" className={styles.upload_modal_btn}>Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default AlBumListAdmin;
