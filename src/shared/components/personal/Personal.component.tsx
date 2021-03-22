import React, { useState } from 'react';
import PersonalMenu from 'shared/components/personalMenu/PersonalMenu.component';
import UserGeneral from 'user/general/General.component';
import UserSongs from 'user/songs/SongsUser.component';
import UserPlayList from 'user/albums/AlbumsUser.component';

// styles scss
import './personal.scss';


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
    <div className="personal__container">
      <PersonalMenu getMenu={getMenu} />
      <div className="user__page">
        {page}
      </div>
    </div>
  );
}


export default Personal;
