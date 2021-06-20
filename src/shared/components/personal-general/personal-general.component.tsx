import { useEffect } from 'react';

// styles scss
import './personal-general.scss';

import PersonalAlbums from 'shared/components/personal-albums/personal-albums.component';
import PersonalSongs from 'shared/components/person-songs/personal-songs.component';


function PersonalGeneral() {

  useEffect(() => {
    
  }, []);

  return (
    <div className="user__general">
      <div className="general__song">
        <PersonalSongs />
      </div>
      <div className="general__album">
        <PersonalAlbums />
      </div>
    </div>
  );
}

export default PersonalGeneral;
