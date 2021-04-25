import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';

import PersonalMenu from 'shared/components/personalMenu/PersonalMenu.component';
import UserGeneral from 'user/general/General.component';
import UserSongs from 'user/songs/SongsUser.component';
import UserPlayList from 'user/albums/AlbumsUser.component';
import PersonalInfo from '../personalInfo/PersonalInfo.component';

// styles scss
import './personal.scss';

function Personal({ history }: any) {
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
        setPage(<UserPlayList />);
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
