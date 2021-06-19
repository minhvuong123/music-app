import { useState } from 'react';

// ant
import {
  Form,
  Input,
  notification
} from 'antd';

import './admin-category.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';

import moment from 'moment';
import UploadComponent from 'shared/components/upload/upload.component';
import { ComponentModel } from 'shared/model';


function AdminCategory({ tabStatus }: ComponentModel) {
  const [validateUploadImage, setValidateUploadImage] = useState<any>('');
  const [base64Image, setBase64] = useState('');
  const [imageType, setImageType] = useState('');
  const [form] = Form.useForm();

  function openNotification(placement: any){
    notification.success({
      className: "app-notification",
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
    <div className="app_category">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category_name: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className="control_layout">
          <Form.Item
            name="category_name"
            label="Name"
            className="control_item"
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="* Image" className="control_item">
            <UploadComponent
              listType='picture-card'
              showUploadList={true}
              limit={1}
              isSubmit={false}
              handleChangeImage={handleChangeImage}
            />
            {validateUploadImage ? <span style={{ color: 'red' }}>{validateUploadImage}</span> : null}
          </Form.Item>
        </div>
        <div>
          <button type="submit" className="upload_modal_btn">Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminCategory;
