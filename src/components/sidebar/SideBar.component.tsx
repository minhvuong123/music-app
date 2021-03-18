import React from 'react';
import { NavLink } from 'react-router-dom';

// antd
import {
  HeartOutlined,
  RightOutlined
} from '@ant-design/icons';


import { 
  SiApplemusic, 
  SiCircle
} from "react-icons/si";

// styles
import styles from './side-bar.module.scss';


function SideBar() {

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_logo}>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className={[styles.sidebar_list, styles.margin_bottom_20].join(' ')}>
        <NavLink to="/my-music" className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><SiApplemusic /></span>
          <span className={styles.list_item_text}>Cá nhân</span>
        </NavLink>
        <a href="/" className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><SiCircle /></span>
          <span className={styles.list_item_text}>Khám phá</span>
        </a>
        <a href="/" className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Theo dõi</span>
        </a>
      </div>
      <div className={styles.line}></div>
      <div className={[styles.sidebar_list, styles.margin_top_20].join(' ')}>
        <a href="/" className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Nhạc mới</span>
        </a>
        <a href="/" className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Thể loại</span>
        </a>
        <a href="/" className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Top 100</span>
        </a>
        <a href="/" className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>MV</span>
        </a>
      </div>
      <div className={styles.extend}>
        <span className={styles.extend_icon}>
          <RightOutlined/>
        </span>
      </div>
    </div>
  );
}

export default SideBar;
