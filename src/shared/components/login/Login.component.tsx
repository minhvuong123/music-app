
// assets
import moment from 'moment';
import axios from 'axios';
import { apiLink } from 'shared/const';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';

// ant
import {
  Form,
  Input
} from 'antd';

// scss
import './login.scss';
import { AlbumModel, ComponentModel } from 'shared/model';
import { setUserAlbums } from 'shared/redux/actions/user.action';

function LoginComponent({ history, setUserAlbums }: ComponentModel) {
  const [form] = Form.useForm();

  async function onFinish(values: any) {
    const resultData = _.cloneDeepWith(values);
    resultData.created_at = moment().toISOString();
    const token = await axios.post(`${apiLink}/users/login`, { user: resultData });

    if (token && token.data && token.data.token) {
      localStorage.setItem('token', token.data.token);

      jwt.verify(token.data.token, 'kiwi', async function (err: any, decoded: any) {
        if (!err) {
          const userAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`)
          if (userAlbums && userAlbums.data && userAlbums.data.albums) {
            setUserAlbums(userAlbums.data.albums);
            localStorage.setItem('userAlbums', JSON.stringify(userAlbums.data.albums));
          }
        }
      });
      history.push('/');
    }
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserAlbums: (albums: AlbumModel[]) => dispatch(setUserAlbums(albums))
  }
}

export default connect(null, mapDispatchToProps)(LoginComponent);