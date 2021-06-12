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
import _ from 'lodash';
import { updateSearchAction } from 'shared/redux/actions/search.action';

function SearchMainComponent({ location, songs, setSongsAction, updateSearch } : ComponentModel) {
  const [singers, setSingers] = useState([] as SingerModel[]);
  const [currentStringText, seturrentStringText] = useState('');

  useEffect(() => {
    let mounted = true;
    function loadData() {
      const { inputText, type } = location.state;
      axios.post(`${apiLink}/search/result`, { value: inputText, type: type, limit: 5 }).then(result => {
        if (mounted) {
          const { singers, songs } = result.data || {};
          setSingers(singers || [] as SingerModel[]);
          setSongsAction(songs) || [] as SingerModel[];
          seturrentStringText(inputText);

          const searchItem = {
            stringText: inputText,
            songs: songs.length,
            albums: 0,
            singers: singers.length
          } as any;

          updateSearch(searchItem);
        }
      });
    }

    if (currentStringText !== location.state.inputText) {
      loadData();
    }

    return () => {  mounted = false; }
  }, [location.state, setSongsAction, updateSearch, currentStringText])

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

const mapStateToProps = ({ songs }: any) => {
  return {
    songs
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearch: (value: string) => dispatch(updateSearchAction(value)),
    setSongsAction: (songs: SongModel[]) => dispatch(setSongsAction(songs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchMainComponent));
