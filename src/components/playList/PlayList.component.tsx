import React from 'react';
import { connect } from 'react-redux';



import {
  Drawer
} from 'antd';

import { setPlayListStatus } from 'shared/redux/actions';

// styles scss
import styles from './play-list.module.scss';
import './play-list.scss';import PlayListSongComponent from 'components/playListSong/PlayListSong.component';
;

function PlayList({ playListStatus, setPlayListStatus, songs }: any) {

  function onClose() {
    setPlayListStatus(false);
  };

  return (
    <div className={styles.app_play_list}>
      {
        songs
          && playListStatus
          ? <Drawer
            title="Danh sách phát"
            className="play_list_drawer"
            placement="right"
            mask={false}
            onClose={onClose}
            visible={playListStatus}
          >
            <div>
              {
                songs
                && songs.map((s: any) => <PlayListSongComponent key={s._id} song={s} />)
              }
            </div>
          </Drawer>
          : ''
      }
    </div>
  );
}

const mapStateToProps = ({ status, songs }: any) => {
  return {
    playListStatus: status.playListStatus,
    songs
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPlayListStatus: (status: boolean) => dispatch(setPlayListStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
