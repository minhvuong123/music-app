import React from 'react';

// ant
import {
  Form,
  Input,
  notification
} from 'antd';

import styles from './singer-admin.module.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { singerType } from 'shared/types';

import moment from 'moment';


function SingerAdmin({ tabStatus }: any) {
  const [form] = Form.useForm();
  
  function openNotification(placement: any){
    notification.success({
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function onFinish(values: singerType) {
    const resultData = {...values};
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/singers`, { singer: resultData }).then(result => {
      form.resetFields();
      openNotification('topRight');
    })
  }
  return (
    <div className={styles.app_singer}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          singer_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className={styles.control_layout}>
          <Form.Item
            name="singer_name"
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

export default SingerAdmin;
