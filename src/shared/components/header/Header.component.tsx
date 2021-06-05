import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { AutoComplete } from 'antd';

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
        history.push('/my-music');
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
          return null;
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

  function onSelect(data: string) {
    console.log('onSelect', data);
  };

  const options1 = [
    {
      label: "label 1",
      value: "value 1"
    },
    {
      label: "label 2",
      value: "value 2"
    },
    {
      label: "label 3",
      value: "value 3"
    }
  ]

  const [options, setOptions] = useState<[]>(options1 as any);
  function onSearch(searchText: string) {
   console.log(searchText);
   const result = options1.filter(option => option.label.includes(searchText));
   setOptions(result as any);
  };

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
          <AutoComplete
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Nhập tên bài hát, Nghệ sĩ hoặc MV..."
          />
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
