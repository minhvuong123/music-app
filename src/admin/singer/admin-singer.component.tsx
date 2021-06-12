
// ant
import {
  Form,
  Input,
  notification
} from 'antd';

import './admin-singer.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';

import moment from 'moment';
import { ComponentModel, SingerModel } from 'shared/model';


function AdminSinger({ tabStatus }: ComponentModel) {
  const [form] = Form.useForm();
  
  function openNotification(placement: any){
    notification.success({
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function onFinish(values: SingerModel) {
    const resultData = {...values};
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/singers`, { singer: resultData }).then(result => {
      form.resetFields();
      openNotification('topRight');
      
    })
  }
  return (
    <div className="app_singer">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          singer_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className="control_layout">
          <Form.Item
            name="singer_name"
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

export default AdminSinger;
