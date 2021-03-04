import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';


import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from './header.module.scss';
import Admin from 'admin/Admin.component';
import { setLoginStatus } from 'shared/redux/actions';
import LoginComponent from 'components/login/Login.component';
import UploadComponent from 'components/upload/Upload.component';
import { apiLink } from 'shared/const';
import moment from 'moment';
import axios from 'axios';


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
    jwt.verify(token, 'kiwi', function (err, decoded) {
      if (!err) {
        console.log(decoded);
      }
    });
    const resultData = {
      created_at: moment().toISOString(),
      song_country: "",
      song_id_albums: "",
      song_url_music: base64Result
    }
    axios.post(`${apiLink}/songs`, { song: resultData }).then(result => {

    })
  }

  return (
    <div className={styles.header_app}>
      <div className={styles.arrow}>
        <div className={styles.arrow_left}><LeftOutlined /></div>
        <div className={styles.arrow_right}><RightOutlined /></div>
      </div>
      <div className={styles.header_search}>
        <div className={styles.search_icon}>
          <SearchOutlined />
        </div>
        <div className={styles.search_input}>
          <input type="text" placeholder="Nhập tên bài hát, Nghệ sĩ hoặc MV..." />
        </div>
      </div>
      <div className={styles.header_right}>
        <div className={styles.admin}>
          <Admin />
        </div>
        <div className={styles.upload}>
          {
            token
              ? <UploadComponent
                listType='text'
                showUploadList={false}
                limit={1}
                isSubmit={isSubmit}
                handleChangeImage={handleChangeMP3}
              />
              : <div className={styles.upload_btn}>
                <UploadOutlined />
              </div>
          }
        </div>
        <div onClick={handleUser} className={styles.user}>
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
