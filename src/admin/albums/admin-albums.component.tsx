
// ant
import {
  Form,
  Input,
  notification
} from 'antd';

import './admin-albums.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';

import moment from 'moment';
import { AlbumsModel, ComponentModel } from 'shared/model';


function AdminAlbums({ tabStatus }: ComponentModel) {
  const [form] = Form.useForm();

  function openNotification(placement: any){
    notification.success({
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function onFinish(values: AlbumsModel) {
    const resultData = {...values};
    resultData.created_at = moment().toISOString();

    axios.post(`${apiLink}/albumList`, { albumList: resultData }).then(result => {
      form.resetFields();
      openNotification('topRight');
    })
  }
  return (
    <div className="app_category">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          albumList_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className="control_layout">
          <Form.Item
            name="albumList_name"
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

export default AdminAlbums;
