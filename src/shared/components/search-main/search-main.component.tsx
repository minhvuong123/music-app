import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { apiLink } from 'shared/const';
import { ComponentModel, SingerModel, SongModel } from 'shared/model';
import Song from 'shared/components/song/song.component';
import { connect } from 'react-redux';

import { RightOutlined } from '@ant-design/icons';

// styles
import './search-main.scss';
import { setSongsAction } from 'shared/redux/actions';

function SearchMainComponent({ location, setSongsAction } : ComponentModel) {
  const [singers, setSingers] = useState([] as SingerModel[]);
  const [songs, setSongs] = useState([] as SongModel[]);

  useEffect(() => {
    const { inputText, type } = location.state;
    axios.post(`${apiLink}/search/result`, { value: inputText, type: type, limit: 5 }).then(result => {
      const { singers, songs } = result.data || {};

      setSingers(singers || [] as SingerModel[]);
      setSongs(songs || [] as SongModel[]);
    });
    return () => { }
  }, [location.state])

  function callBackPlaySong() {
    setSongsAction(songs);
  }

  return (
    <div className="search__main__container">
      <div className="search__main__songs">
        {
          songs && songs.length > 0 
          && <NavLink to={{
            pathname: `/tim-kiem/bai-hat`,
            search: `?q=${location.state.inputText}`,
            state: { inputText: location.state.inputText, type: 'bai-hat' }
          }} className="search__link">
            Bài Hát
            <span className="ml__10"><RightOutlined /></span>
          </NavLink>
        }

          {
            songs && songs.map((s: SongModel) => <Song key={s._id} song={s} callBackPlaySong={callBackPlaySong} />)
          }
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSongsAction: (songs: SongModel[]) => dispatch(setSongsAction(songs)),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(SearchMainComponent));
