
import { connect } from 'react-redux';

// components
import SideBar from 'shared/components/side-bar/side-bar.component';
import Header from 'shared/components/header/header.component';
import PlayControl from 'shared/components/player-control/play-control.component';
import PlayList from 'shared/components/play-list/play-list.component';

// routes
import Routes, { RenderRoutes } from 'routes/routes';

// styles scss
import 'antd/dist/antd.css';
import './app.scss';
import { ComponentModel } from 'shared/model';

function App({ song } : ComponentModel) {
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
        <PlayControl />
      </div>
  );
}

const mapStateToProps = ({ song }: any) => {
  return {
    song
  }
}

export default connect(mapStateToProps, null)(App);
