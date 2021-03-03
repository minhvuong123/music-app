import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { setLoginStatus } from 'shared/redux/actions';

// ant
import {
  Form,
  Input
} from 'antd';


import styles from './login.module.scss';

function LoginComponent({ loginStatus, setLoginStatus }: any) {
  const [form] = Form.useForm();

  function onFinish(results: any) {

  };
  return (
    <>
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
            song_name: '',
            song_singer: [],
            song_url_image: '',
            song_url_music: '',
            song_id_playlist: '',
            created_at: ''
          }}
          onFinish={onFinish}
          onFinishFailed={onFinish}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <div>
            <button type="submit" className={styles.upload_modal_btn}>Confirm</button>
            <a href="/" className={styles.margin_left_10}>Quên mật khẩu?</a>
          </div>
        </Form>
      </Modal>
    </>
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