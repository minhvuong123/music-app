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
import { PlayListShowType } from 'shared/types';

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

  function onFinish(values: PlayListShowType) {
    const resultData = {...values};
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/playListShows`, { playListShow: resultData }).then(result => {
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
          playListShow_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className={styles.control_layout}>
          <Form.Item
            name="playListShow_name"
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
