import React from 'react';
import { connect } from 'react-redux';

// components
import SideBar from 'components/sidebar/SideBar.component';
import Header from 'components/header/Header.component';

// styles scss
import styles from './app.module.scss';


// routes
import Routes, { RenderRoutes } from 'routes/routes';
import PlayControl from 'components/playerControl/PlayControl.component';
import { songType } from 'shared/types';
import PlayList from 'components/playList/PlayList.component';


function App({ song }:any) {
  return (
      <div className={styles.app}>
        <div className={[styles.app_layout, `${Object.keys(song).length > 0 ? 'has-play' : ''}`].join(' ')}>
          <SideBar />
          <div className={styles.app_content_wrap}>
            <Header />
            <div className={styles.app_content}>
              <RenderRoutes routes={Routes} />
            </div>
          </div>
        </div>
        <PlayList />
        <PlayControl song={{} as songType} songs={[]} />
      </div>
  );
}

const mapStateToProps = ({ song }: any) => {
  return {
    song
  }
}

export default connect(mapStateToProps, null)(App);
