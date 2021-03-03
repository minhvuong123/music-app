import React, { useState } from 'react';
import { personalMenu } from 'shared/const';

// styles scss
import styles from './personal-menu.module.scss';

function PersonalMenu({ getMenu }: any ) {
  const [name, setName] = useState('tong_quan');

  function changeMenu(e: any, value: string) {
    e.preventDefault();
    setName(value);
    getMenu(value);
  }
  return (
    <ul className={styles.personal_nav}>
      {
        personalMenu.map(p => (
          <li key={p.key} className={`${name === p.key ? styles.active : ''}`}>
            <a href="/" onClick={(e) => changeMenu(e, p.key)}>{p.value}</a>
          </li>
        ))
      }
      {/* <li className={styles.active}><a href="/">TỔNG QUAN</a></li>
      <li><a href="/">BÀI HÁT</a></li>
      <li><a href="/">PLAYLIST</a></li>
      <li><a href="/">NGHỆ SĨ</a></li>
      <li><a href="/">ALBUM</a></li>
      <li><a href="/">TẢI LÊN</a></li> */}
    </ul>
  );
}


export default PersonalMenu;
