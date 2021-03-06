import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// components
import UploadComponent from 'shared/components/upload/upload.component';
import Admin from 'admin/admin-routes.component';

// assets
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
import { ComponentModel } from 'shared/model';
import SearchInputComponent from 'shared/components/search-input/search-input.component';

function Header({ history }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [user, setUser] = useState(undefined) as any;
  const [isSubmit] = useState(false);

  useEffect(() => {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (!err) {
        setUser(decoded._doc);
      }
    });
  }, [token])

  function handleUser() {
    jwt.verify(token, 'kiwi', function (err, decoded) {
      if (!err) {
        history.push('/my-music/tong-quan');
      } else {
        history.push('/login');
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

  function redirectLogin() {
    history.push('/login');
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
         <SearchInputComponent />
        </div>
      </div>
      <div className="right">
        {
          user && user.user_role === 'admin'
          && <div className="right__admin">
            <Admin />
          </div>
        }

        <div className="right__upload">
          {
             user
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
      </div>
    </div>
  );
}

export default withRouter(Header);
