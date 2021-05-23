import { useEffect } from 'react';

// styles scss
import './general.scss';

import UserAlbums from 'user/albums/user-albums.component';
import UserSongs from 'user/songs/user-songs.component';


function UserGeneral() {

  useEffect(() => {
    
  }, []);

  return (
    <div className="user__general">
      <div className="general__song">
        <UserSongs />
      </div>
      <div className="general__album">
        <UserAlbums />
      </div>
    </div>
  );
}


export default UserGeneral;
