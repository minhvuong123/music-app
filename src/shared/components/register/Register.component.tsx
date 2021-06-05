
// assets
import moment from 'moment';
import axios from 'axios';
import { apiLink } from 'shared/const';
import _ from 'lodash';

// ant
import {
  Form,
  Input
} from 'antd';

// scss
import './register.scss';
import { ComponentModel } from 'shared/model';

function RegisterComponent({ history }: ComponentModel) {
  const [form] = Form.useForm();

  function onFinish(values: any) {
    const resultData = _.cloneDeepWith(values);
    resultData.created_at = moment().toISOString();
    axios.post(`${apiLink}/users/register`, { user: resultData }).then(result => {
      history.push('/login');
      return null;
    });
  };
  return (
    <div className="register__container">
      <Form
        form={form}
        layout="vertical"
        className="register__form"
        initialValues={{
          user_email: '',
          user_phone: '',
          user_password: '',
          created_at: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinish}
      >
        <Form.Item
          name="user_email"
          label="Tên đăng nhập / Email"
          rules={[{ required: true, message: 'Name is not empty!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="user_phone"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Name is not empty!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="user_password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Name is not empty!' }]}
        >
          <Input />
        </Form.Item>
        <div className="d-flex">
          <button type="submit" className="register__btn">Đăng Ký</button>
        </div>
      </Form>
    </div>
  )
}


export default RegisterComponent;