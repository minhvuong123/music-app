// ant
import {
  Form,
  Input,
  notification
} from 'antd';

import './admin-country.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';

import moment from 'moment';
import { ComponentModel, CountryModel } from 'shared/model';


function AdminCountry({ tabStatus }: ComponentModel) {
  const [form] = Form.useForm();


  function openNotification(placement: any){
    notification.success({
      className: "app-notification",
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function onFinish(values: CountryModel) {
    const resultData = {...values};
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/countries`, { country: resultData }).then(result => {
      form.resetFields();
      openNotification('topRight');
    })
  }
  return (
    <div className="app_country">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          country_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className="control_layout">
          <Form.Item
            name="country_name"
            label="Name"
            className="control_item"
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <button type="submit" className="upload_modal_btn">Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminCountry;
