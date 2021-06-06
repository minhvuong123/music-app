import { useState, useEffect } from 'react';
import { searchNav } from 'shared/const';
import { withRouter } from 'react-router-dom';

// styles
import './search-nav.scss';
import { ComponentModel } from 'shared/model';

function SearchNavComponent( { history, location }: ComponentModel) {
  const [name, setName] = useState('tat-ca');

  useEffect(() => {
    setName(location.state.type);
    return () => { }
  }, [location.state])

  function changeSearchNav(e: any, value: string) {
    e.preventDefault();
    history.push({
      pathname: `/tim-kiem/${value}`,
      search: `?q=${location.state.inputText}`,
      state: { inputText: location.state.inputText, type: value }
    });
    setName(value);
  }

  return (
    <ul className="search__nav">
      {
        searchNav.map(p => (
          <li key={p.key}>
            <a href="/" className={`${name === p.key ? "active" : ""}`} onClick={(e) => changeSearchNav(e, p.key)}>
              {p.value}
              <span className="search-badge">100</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export default withRouter(SearchNavComponent);
