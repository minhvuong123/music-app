import React from 'react';

// components
import SideBar from 'components/sidebar/SideBar.component';
import Header from 'components/header/Header.component';

// styles scss
import styles from './app.module.scss';


// routes
import Routes, { RenderRoutes } from 'routes/routes';
import PlayControl from 'components/playerControl/PlayControl.component';


function App() {
  return (
      <div className={styles.app}>
        <div className={styles.app_layout}>
          <SideBar />
          <div className={styles.app_content_wrap}>
            <Header />
            <div className={styles.app_content}>
              <RenderRoutes routes={Routes} />
            </div>
          </div>
        </div>
        <PlayControl />
      </div>
  );
}

export default App;
