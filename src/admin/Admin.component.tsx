import React, { useState } from 'react';

// ant design
import {
  Drawer,
  Button,
  Tabs
} from 'antd';

// styles scss
import styles from './admin.module.scss';
import CategoryAdmin from './category/CategoryAdmin.component';
import SongAdmin from './song/SongAdmin.component';
import AlBumAdmin from './album/AlbumAdmin.component';
import SingerAdmin from './singer/SingerAdmin.component';
import CountryAdmin from './country/CountryAdmin.component';
import AlBumListAdmin from './albumList/AlbumListAdmin.component';
import ContentAdmin from './contentShow/ContentAdmin.component';


const { TabPane } = Tabs;

function Admin() {
  const [visible, setVisible] = useState(false);
  const [tabValue, setTabValue] = useState('content');
  const [tabStatus, setTabStatus] = useState(false);

  function showDrawer() {
    setVisible(true);
  };

  function onClose() {
    setVisible(false);
  };

  function tabChange(value: string) {
    setTabValue(value);
    setTabStatus(!tabStatus);
  }

  return (
    <div className={styles.app_admin}>
      <Button className={styles.admin_btn} onClick={showDrawer}>
        Admin
      </Button>
      <Drawer
        title="Admin Management"
        placement="right"
        width="70%"
        className="admin_drawer"
        onClose={onClose}
        visible={visible}
      >
        <Tabs className="admin_tabs" defaultActiveKey={tabValue} onChange={tabChange}>
          <TabPane tab="Content" key="content">
            <ContentAdmin tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Albums Title" key="playListShows">
            <AlBumListAdmin tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Albums" key="playLists">
            <AlBumAdmin tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Songs" key="songs">
            <SongAdmin tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Categories" key="categories">
            <CategoryAdmin tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Singers" key="singers">
            <SingerAdmin tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Countries" key="countries">
            <CountryAdmin tabStatus={tabStatus} />
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
}

export default Admin;
