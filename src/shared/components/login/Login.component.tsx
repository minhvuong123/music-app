import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';



// assets
import moment from 'moment';
import axios from 'axios';
import { apiLink } from 'shared/const';
import _ from 'lodash';
import { setLoginStatus } from 'shared/redux/actions';

// ant
import {
  Form,
  Input
} from 'antd';

// scss
import './login.scss';

function LoginComponent({ loginStatus, setLoginStatus }: any) {
  const [form] = Form.useForm();

  function onFinish(values: any) {
    console.log(values);
    const resultData = _.cloneDeepWith(values);
    resultData.created_at = moment().toISOString();
    axios.post(`${apiLink}/users/login`, { user: resultData }).then(result => {
      localStorage.setItem('token', result.data.token);
      setLoginStatus(false);
    });
  };
  return (
    <div className="login__container">
      <Modal
        width={300}
        visible={loginStatus}
        onCancel={() => setLoginStatus(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
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
            label="Tên đăng nhập"
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
          <div>
            <button type="submit" className="upload__btn">Confirm</button>
            <a href="/" className="ml__10">Quên mật khẩu?</a>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ status }: any) => {
  return {
    loginStatus: status.loginStatus
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLoginStatus: (status: boolean) => dispatch(setLoginStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);