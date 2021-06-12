import { useEffect, useState } from 'react';
import { apiLink, SEARCH_NAV, SEARCH_HEADER_KEY } from 'shared/const';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// styles
import './search-nav.scss';
import { ComponentModel } from 'shared/model';
import { updateSearchAction } from 'shared/redux/actions/search.action';
import axios from 'axios';

function SearchNavComponent( { history, location, search, updateSearch }: ComponentModel) {
  const [name, setName] = useState('tat-ca');
  const [currentStringText, setCurrentStringText] = useState('');
  const [currentSearchItem, setCurrentSearchItem] = useState({} as any);

  useEffect(() => {
    let mounted = true;
    function loadData() {
      const { inputText, type } = location.state;
      axios.post(`${apiLink}/search/result`, { value: inputText, type: type, limit: 5 }).then(result => {
        if (mounted) {
          const { singers, songs } = result.data || {};
 
          const searchItem = {
            stringText: inputText,
            songs: songs.length,
            albums: 0,
            singers: singers.length
          } as any;

          setCurrentStringText(inputText);
          setCurrentSearchItem(searchItem);
          updateSearch(searchItem);
        }
      });
    }

    if (currentStringText !== location.state.inputText) {
      loadData();
    }

    return () => {  mounted = false; }
  }, [location.state, search,  updateSearch, currentStringText])

  function changeSearchNav(e: any, value: string) {
    e.preventDefault();
    history.push({
      pathname: `/tim-kiem/${value}`,
      search: `?q=${location.state.inputText}`,
      state: { inputText: location.state.inputText, type: value }
    });
    setName(value);
  }

  function getNumber(key: string, searchItem: any): number {
    const { songs, albums, singers } = searchItem || {};
    switch (key) {
      case SEARCH_HEADER_KEY.BAI_HAT:
        return songs || 0;
      case SEARCH_HEADER_KEY.PLAY_LIST:
        return albums || 0;
      case SEARCH_HEADER_KEY.NGHE_SI:
        return singers || 0;
      default:
        return 0;
    }
  }

  return (
    <ul className="search__nav">
      {
        SEARCH_NAV.map((p: any) => (
          <li key={p.key}>
            <a href="/" className={`${name === p.key ? "active" : ""}`} onClick={(e) => changeSearchNav(e, p.key)}>
              { p.value }
              { p.key !== SEARCH_HEADER_KEY.TAT_CA && <span className="search-badge">{ getNumber(p.key, currentSearchItem) }</span> } 
            </a>
          </li>
        ))
      }
    </ul>
  );
}

const mapStateToProps = ({ search }: any) => {
  return {
    search
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearch: (value: any) => dispatch(updateSearchAction(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchNavComponent));
