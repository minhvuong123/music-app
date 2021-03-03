import React, { useState } from 'react';
import PersonalMenu from 'components/persionalMenu/PersonalMenu.component';

// styles scss
import styles from './personal.module.scss';
import UserGeneral from 'user/general/General.component';
import UserSongs from 'user/songs/Songs.component';
import UserPlayList from 'user/playList/PlayList.component';

function Personal({ songs }: any) {
  const [page, setPage] = useState(<UserGeneral />);

  function getMenu(value: string) {
    switch (value) {
      case 'bai_hat':
        setPage(<UserSongs />);
        break;
      case 'play_list':
        setPage(<UserPlayList />);
        break;
      default:
        setPage(<UserGeneral />);
        break;
    }
  }

  return (
    <div className={styles.app_personal}>
      <PersonalMenu getMenu={getMenu} />
      <div className={styles.user_page}>
        {page}
      </div>
    </div>
  );
}


export default Personal;
