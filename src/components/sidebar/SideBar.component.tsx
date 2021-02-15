import React from 'react';

// antd
import {
  HeartOutlined,
  RightOutlined,
  LeftOutlined,
  UserOutlined
} from '@ant-design/icons';

// styles
import styles from './side-bar.module.scss';


function SideBar() {

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_logo}>

      </div>
      <div className={[styles.sidebar_list, styles.margin_bottom_20].join(' ')}>
        <div className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><UserOutlined /></span>
          <span className={styles.list_item_text}>Cá nhân</span>
        </div>
        <div className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Khám phá</span>
        </div>
        <div className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Theo dõi</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={[styles.sidebar_list, styles.margin_top_20].join(' ')}>
        <div className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Nhạc mới</span>
        </div>
        <div className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Thể loại</span>
        </div>
        <div className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>Top 100</span>
        </div>
        <div className={styles.sidebar_list_item}>
          <span className={styles.list_item_icon}><HeartOutlined /></span>
          <span className={styles.list_item_text}>MV</span>
        </div>
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
