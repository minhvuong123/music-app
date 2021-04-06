import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// components
import LoginComponent from 'shared/components/login/Login.component';
import UploadComponent from 'shared/components/upload/Upload.component';
import Admin from 'admin/Admin.component';

// assets
import { setLoginStatus } from 'shared/redux/actions';
import { apiLink } from 'shared/const';
import moment from 'moment';
import axios from 'axios';

// icons
import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';

// scss
import './header.scss';

function Header({ history, setLoginStatus }: any) {
  const token = localStorage.getItem('token') as string;
  const [isSubmit] = useState(false);

  function handleUser() {
    jwt.verify(token, 'kiwi', function (err, decoded) {
      if (!err) {
        history.push('/my-music');
      } else {
        setLoginStatus(true);
      }
    });
  }

  function handleChangeMP3(base64Result: string, type: string) {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (!err) {
        const resultData = {
          created_at: moment().toISOString(),
          song_country: "",
          song_id_albums: "",
          song_url_music: base64Result,
          song_user_id: decoded._doc._id
        }
        axios.post(`${apiLink}/songs`, { song: resultData }).then(result => {
          // handle to success message
        })
      }
    });
  }

  function goBack() {
    window.history.go(-1);
  }

  function goForward() {
    window.history.go(1);
  }

  function redirectLogin(){
    setLoginStatus(true);
  }

  return (
    <div className="header__container">
      <div className="arrow">
        <div onClick={goBack} className="arrow__left"><LeftOutlined /></div>
        <div onClick={goForward} className="arrow__right"><RightOutlined /></div>
      </div>
      <div className="search">
        <div className="search__icon">
          <SearchOutlined />
        </div>
        <div className="search__input">
          <input type="text" placeholder="Nhập tên bài hát, Nghệ sĩ hoặc MV..." />
        </div>
      </div>
      <div className="right">
        <div className="right__admin">
          <Admin />
        </div>
        <div className="right__upload">
          {
            token
              ? <UploadComponent
                listType='text'
                showUploadList={false}
                limit={1}
                isSubmit={isSubmit}
                handleChangeImage={handleChangeMP3}
              >
                <div className="upload__btn">
                  <UploadOutlined />
                </div>
              </UploadComponent>
              : <div onClick={redirectLogin} className="upload__btn">
                <UploadOutlined />
              </div>
          }
        </div>
        <div onClick={handleUser} className="user">
          <UserOutlined />
        </div>
        <LoginComponent />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLoginStatus: (status: boolean) => dispatch(setLoginStatus(status))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Header));
