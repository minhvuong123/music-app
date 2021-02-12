import React from 'react';

// ant component
import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined
} from '@ant-design/icons';

import styles from  './header.module.scss';

function Header({ children, responsive, title }: any) {

  return (
    <div className={styles.header_app}>
      <div className={styles.arrow}>
        <div className={styles.arrow_left}><LeftOutlined/></div>
        <div className={styles.arrow_right}><RightOutlined/></div>
      </div>
      <div className={styles.header_search}>
        <div className={styles.search_icon}>
          <SearchOutlined />
        </div>
        <div className={styles.search_input}>
          <input type="text" placeholder="Nhập tên bài hát, Nghệ sĩ hoặc MV..." />
        </div>
      </div>
    </div>
  );
}

export default Header;
