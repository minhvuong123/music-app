import React from 'react';
import { NavLink } from 'react-router-dom';

// antd
import { HeartOutlined, RightOutlined } from '@ant-design/icons';
import { BsMusicNoteBeamed } from "react-icons/bs";
import { CgTikcode } from "react-icons/cg";
import { SiApplemusic, SiCircle } from "react-icons/si";

// styles
import './side-bar.scss';


function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="sidebar__list mb__20">
        <NavLink to="/my-music" className="item">
          <span className="item__icon"><SiApplemusic /></span>
          <span className="item__text">Cá nhân</span>
        </NavLink>
        <a href="/" className="item">
          <span className="item__icon"><SiCircle /></span>
          <span className="item__text">Khám phá</span>
        </a>
        <a href="/" className="item">
          <span className="item__icon"><HeartOutlined /></span>
          <span className="item__text">Theo dõi</span>
        </a>
      </div>
      <div className="line"></div>
      <div className="sidebar__list mt__20">
        <a href="/" className="item">
          <span className="item__icon"><BsMusicNoteBeamed /></span>
          <span className="item__text">Nhạc mới</span>
        </a>
        <a href="/" className="item">
          <span className="item__icon"><CgTikcode /></span>
          <span className="item__text">Thể loại</span>
        </a>
      </div>
      <div className="extend">
        <span className="extend__icon">
          <RightOutlined/>
        </span>
      </div>
    </div>
  );
}

export default SideBar;
