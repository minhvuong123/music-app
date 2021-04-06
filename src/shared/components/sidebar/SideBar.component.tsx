import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// antd
import { HeartOutlined, RightOutlined } from '@ant-design/icons';
import { BsMusicNoteBeamed } from "react-icons/bs";
import { CgTikcode } from "react-icons/cg";
import { SiApplemusic, SiCircle } from "react-icons/si";

// assets
import { setLoginStatus, setMenuName } from 'shared/redux/actions';

// styles
import './side-bar.scss';

function SideBar({ setMenuName, setLoginStatus }: any) {
  const token = localStorage.getItem('token') as string;
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (!err) {
       setUser(decoded._doc);
      }
    });
  }, [token])

  function authenticate(e: any) {
    if (Object.keys(user).length <= 0) {
      e.preventDefault();
      setLoginStatus(true);
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="sidebar__list mb__20">
        <NavLink to="/my-music" onClick={authenticate} className="item">
          <span className="item__icon"><SiApplemusic /></span>
          <span className="item__text">Cá nhân</span>
        </NavLink>
        <NavLink to="/kham-pha" className="item">
          <span className="item__icon"><SiCircle /></span>
          <span className="item__text">Khám phá</span>
        </NavLink>
      </div>
      <div className="line"></div>
      <div className="sidebar__list mt__20">
        <NavLink to="/moi-phat-hanh" className="item">
          <span className="item__icon"><BsMusicNoteBeamed /></span>
          <span className="item__text">Nhạc mới</span>
        </NavLink>
        <NavLink to="/category" className="item">
          <span className="item__icon"><CgTikcode /></span>
          <span className="item__text">Thể loại</span>
        </NavLink>
      </div>
      <div className="extend">
        <span className="extend__icon">
          <RightOutlined/>
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = ({ isLoading, songs, album, error }: any) => {
  return {
    isLoading,
    songs,
    album,
    error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMenuName: (name: string) => dispatch(setMenuName(name)),
    setLoginStatus: (status: boolean) => dispatch(setLoginStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
