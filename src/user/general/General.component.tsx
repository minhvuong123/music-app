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
        <UserSongs />
      </div>
      <div className={styles.general_album}>
        <UserPlayList />
      </div>
    </div>
  );
}


export default UserGeneral;
