import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ComponentModel, SongModel } from 'shared/model';
import { setSongsAction } from 'shared/redux/actions';
import { connect } from 'react-redux';
import Song from 'shared/components/song/song.component';
import { RightOutlined } from '@ant-design/icons';

// styles
import './search-songs.scss';
import axios from 'axios';
import { apiLink } from 'shared/const';

function SearchSongsComponent({ location, setSongsAction } : ComponentModel) {
  const [songs, setSongs] = useState([] as SongModel[]);

  useEffect(() => {
    const { inputText, type } = location.state;
    axios.post(`${apiLink}/search/result`, { value: inputText, type: type, limit: 5 }).then(result => {
      const { songs } = result.data || {};

      setSongs(songs || [] as SongModel[]);
    });
    return () => { }
  }, [location.state])

  function callBackPlaySong() {
    setSongsAction(songs);
  }

  return (
    <div className="search__songs__container">
      {
        songs && songs.length > 0 
        && <h3 className="songs__title">
          Bài Hát
          <span className="ml__10"><RightOutlined /></span>
        </h3>
      }
     
      {
        songs && songs.map((s: SongModel) => <Song key={s._id} song={s} callBackPlaySong={callBackPlaySong} />)
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSongsAction: (songs: SongModel[]) => dispatch(setSongsAction(songs)),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(SearchSongsComponent));
