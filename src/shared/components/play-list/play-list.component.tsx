import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import PlayListSong from 'shared/components/play-songs/play-songs.component';

import {
  Drawer
} from 'antd';

// assets
import { setPlayListStatus } from 'shared/redux/actions';

// styles scss
import './play-list.scss';
import { ComponentModel } from 'shared/model';

function PlayList({ playListStatus, setPlayListStatus, song, songs, album }: ComponentModel) {
  const [songsPrevious, setSongsPrevious] = useState([]);
  const [songsNext, setSongsNext] = useState([]);

  useEffect(() => {
    const songIndex = songs.findIndex((s: any) => s._id === song._id);

    if (songIndex >= 0) {
      setSongsPrevious(songs.slice(0, songIndex + 1));
      setSongsNext(songs.slice(songIndex + 1, songs.length));
    }
    return () => { }
  }, [song, songs]);

  function onClose() {
    setPlayListStatus(false);
  };

  return (
    <div className="app_play_list">
      {
        songs
          && playListStatus
          ? <Drawer
            title="Danh sách phát"
            className="play__drawer"
            placement="right"
            mask={false}
            onClose={onClose}
            visible={playListStatus}
          >
            <div>
              {
                songsPrevious && songsPrevious.map((s: any) => <PlayListSong key={s._id} song={s} />)
              }
              <div className="continue">
                <h3 className="title">Tiếp theo</h3>
                <h3 className="subtitle">
                  <span>Từ playlist</span>
                  <a href="/">{album && album.album_name}</a>
                </h3>
              </div>
              {
                songsNext
                && songsNext.map((s: any) => <PlayListSong key={s._id} song={s} />)
              }
            </div>
          </Drawer>
          : ''
      }
    </div>
  );
}

const mapStateToProps = ({ status, song, songs, album }: any) => {
  return {
    playListStatus: status.playListStatus,
    song,
    songs,
    album
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPlayListStatus: (status: boolean) => dispatch(setPlayListStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
