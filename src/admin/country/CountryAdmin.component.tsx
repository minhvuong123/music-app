import React from 'react';

// ant
import {
  Form,
  Input
} from 'antd';

import styles from './country-admin.module.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { countryType } from 'shared/types';

import moment from 'moment';


function CountryAdmin({ tabStatus }: any) {
  const [form] = Form.useForm();

  function onFinish(values: countryType) {
    const resultData = {...values};
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/countries`, { country: resultData }).then(result => {
      form.resetFields();
    })
  }
  return (
    <div className={styles.app_country}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          country_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className={styles.control_layout}>
          <Form.Item
            name="country_name"
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

export default CountryAdmin;
