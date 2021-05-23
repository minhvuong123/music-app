import { useState } from 'react';

// ant design
import {
  Drawer,
  Button,
  Tabs
} from 'antd';

// styles scss
import './admin-routes.scss';
import AdminCategory from './category/admin-category.component';
import AdminSong from './song/admin-song.component';
import AdminAlBum from './album/admin-album.component';
import AdminSinger from './singer/admin-singer.component';
import AdminCountry from './country/admin-country.component';
import AdminAlbums from './albums/admin-albums.component';
import AdminContent from './content/admin-content.component';


const { TabPane } = Tabs;

function AdminRoutes() {
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
    <div className="app_admin">
      <Button className="admin_btn" onClick={showDrawer}> Admin </Button>
      <Drawer
        title="Admin Management"
        placement="right"
        width="70%"
        className="admin_drawer"
        onClose={onClose}
        visible={visible}
      >
        <Tabs className="admin_tabs" tabPosition='left' defaultActiveKey={tabValue} onChange={tabChange}>
          <TabPane tab="Content" key="content">
            <AdminContent tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Albums Title" key="playListShows">
            <AdminAlbums tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Albums" key="playLists">
            <AdminAlBum tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Songs" key="songs">
            <AdminSong tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Categories" key="categories">
            <AdminCategory tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Singers" key="singers">
            <AdminSinger tabStatus={tabStatus} />
          </TabPane>
          <TabPane tab="Countries" key="countries">
            <AdminCountry tabStatus={tabStatus} />
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
}

export default AdminRoutes;
