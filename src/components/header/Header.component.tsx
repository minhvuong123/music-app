import React, { useState } from 'react';
import { connect } from 'react-redux';

// ant
import {
  Modal,
} from 'antd';

import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from './header.module.scss';
import SongAdmin from 'admin/song/SongAdmin.component';
import Admin from 'admin/Admin.component';
import { setLoginStatus } from 'shared/redux/actions';
import LoginComponent from 'components/login/Login.component';


function Header({ setLoginStatus }: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    setIsSubmit(!isSubmit);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          <div className={styles.upload_btn} onClick={showModal}><UploadOutlined /></div>
          <Modal
            title="Upload song"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <SongAdmin />
          </Modal>
        </div>
        <div onClick={() => setLoginStatus(true)} className={styles.user}>
          <UserOutlined />
        </div>
        <LoginComponent />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    setLoginStatus: (status: boolean) => dispatch(setLoginStatus(status))
  }
}

export default connect(null, mapDispatchToProps)(Header);
