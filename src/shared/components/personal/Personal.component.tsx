import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';

import PersonalMenu from 'shared/components/personal-menu/personal-menu.component';
import UserGeneral from 'user/general/general.component';
import UserSongs from 'user/songs/user-songs.component';
import UserAlbums from 'user/albums/user-albums.component';
import PersonalInfo from '../personal-info/personal-info.component';

// styles scss
import './personal.scss';
import { ComponentModel } from 'shared/model';

function Personal({ history }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [page, setPage] = useState(<UserGeneral />);

  useEffect(() => {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (err) {
        history.push('/');
      }
    });
  }, [token, history])

  function getMenu(value: string) {
    switch (value) {
      case 'bai_hat':
        setPage(<UserSongs />);
        break;
      case 'play_list':
        setPage(<UserAlbums />);
        break;
      default:
        setPage(<UserGeneral />);
        break;
    }
  }

  return (
    <div className="personal__container">
      <div className="pb__50 pt__20 w__100 p__relative">
        <PersonalInfo/>
      </div>
      <PersonalMenu getMenu={getMenu} />
      <div className="user__page">
        {page}
      </div>
    </div>
  );
}


export default withRouter(Personal);
