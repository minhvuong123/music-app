import React from 'react';
import { connect } from 'react-redux';

// components
import SideBar from 'shared/components/sidebar/SideBar.component';
import Header from 'shared/components/header/Header.component';
import PlayControl from 'shared/components/playerControl/PlayControl.component';
import { songType } from 'shared/types';
import PlayList from 'shared/components/playList/PlayList.component';

// routes
import Routes, { RenderRoutes } from 'routes/routes';

// styles scss
import 'antd/dist/antd.css';
import './app.scss';

function App({ song }:any) {
  return (
      <div className="app">
        <div className={`app__layout ${Object.keys(song).length > 0 ? 'has-play' : ''}`}>
          <SideBar />
          <div className="content">
            <Header />
            <div className="content__routes">
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
