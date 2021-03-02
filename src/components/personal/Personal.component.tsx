import React from 'react';
import { connect } from 'react-redux';
import { loadSongsAction, loadAlbumAction } from 'shared/redux/actions';
import { songType } from 'shared/types';
import Song from 'components/song/Song.component';

// styles scss
import styles from './personal.module.scss';

function Personal({ songs }: any) {

  return (
    <div className={styles.app_personal}>
      <ul className={styles.personal_nav}>
        <li className={styles.active}><a href="/">TỔNG QUAN</a></li>
        <li><a href="/">BÀI HÁT</a></li>
        <li><a href="/">PLAYLIST</a></li>
        <li><a href="/">NGHỆ SĨ</a></li>
        <li><a href="/">ALBUM</a></li>
        <li><a href="/">TẢI LÊN</a></li>
      </ul>
      <div className={styles.personal_song}>
        <h3 className={styles.song_title}>Bài Hát</h3>
        <div className={styles.song_list}>
          {
            songs && songs.map((s: songType) => <Song key={s._id} song={s} />)
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ songs }: any) => {
  return {
    songs,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadAlbumAction: (name: string) => dispatch(loadAlbumAction(name)),
    loadSongsAction: () => dispatch(loadSongsAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
