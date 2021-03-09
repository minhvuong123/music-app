import React, { useEffect } from 'react';

// styles scss
import styles from './general.module.scss';

import UserPlayList from 'user/playList/PlayList.component';
import UserSongs from 'user/songs/Songs.component';


function UserGeneral() {

  useEffect(() => {
    
  }, []);

  return (
    <div className={styles.user_general}>
      <div className={styles.general_song}>
        <h3><a href="/">Bài Hát</a></h3>
        <UserSongs />
      </div>
      <div className={styles.general_album}>
        <h3><a href="/">Album</a></h3>
        <UserPlayList />
      </div>
    </div>
  );
}


export default UserGeneral;
