import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';

// icon
import { FaUserAlt } from "react-icons/fa";

// styles scss
import './personal-info.scss';
import { apiLink } from 'shared/const';


function PersonalInfo({ history } : any) {
  const token = localStorage.getItem('token') as string;
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (!err) {
       setUser(decoded._doc);
      }
    });
  }, [token])

  function logout() {
    localStorage.setItem('token', '');
    history.push('/');
  }

  return (
    <div className="personal__info">
      <div className="info__avatar">
        {
          Object.keys(user).length > 0 && user.user_avatar 
          ? <img src={`${apiLink}/${user.user_avatar}`} alt="avatar" />
          : <span>
            <FaUserAlt/>
          </span>
        }
      </div>
      <div className="info__name">
        {
          Object.keys(user).length > 0 
          && user.user_name ? user.user_name : ''
        }
      </div>
      <div onClick={logout} className="info__btn">
        <span>Đăng Xuất</span>
      </div>
    </div>
  );
}


export default withRouter(PersonalInfo);
