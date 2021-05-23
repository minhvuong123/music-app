
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
import './login.scss';
import { ComponentModel } from 'shared/model';

function LoginComponent({ history }: ComponentModel) {
  const [form] = Form.useForm();

  function onFinish(values: any) {
    const resultData = _.cloneDeepWith(values);
    resultData.created_at = moment().toISOString();
    axios.post(`${apiLink}/users/login`, { user: resultData }).then(result => {
      localStorage.setItem('token', result.data.token);
      history.push('/');
    });
  };

  function register(event: any) {
    event.preventDefault();
    history.push('/register');
  }
  return (
    <div className="login__container">
      <Form
        form={form}
        layout="vertical"
        className="login__form"
        initialValues={{
          user_email: '',
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
          name="user_password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Name is not empty!' }]}
        >
          <Input />
        </Form.Item>
        <div className="d-flex">
          <button type="submit" className="login__btn">Đăng Nhập</button>
          <div>
            <a href="/" className="ml__10 d-block purple">Quên mật khẩu?</a>
            <a href="/" onClick={register} className="ml__10 d-block purple">Đăng ký</a>
          </div>
        </div>
      </Form>
    </div>
  )
}


export default LoginComponent;