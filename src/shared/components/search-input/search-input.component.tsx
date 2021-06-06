import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// styles
import './search-input.scss';

import { ComponentModel } from 'shared/model';
import { AutoComplete } from 'antd';
import { updateSearchAction } from 'shared/redux/actions/search.action';
import { apiLink } from 'shared/const';
import axios from 'axios';

function SearchInputComponent({ match, history, updateSearch }: ComponentModel) {

  useEffect(() => {
    return () => {}
  }, [match.path])

  const [options, setOptions] = useState<[]>([]);

  function onSearch(searchText: string) {
    axios.post(`${apiLink}/search`, { value: searchText, limit: 5 }).then(result => {
      setOptions(result.data.searchResults as any);
    });
  };

  function onSelect(value: string) {
    updateSearch(value);
    history.push({
      pathname: `/tim-kiem/tat-ca`,
      search: `?q=${value}`,
      state: { inputText: value, type: 'tat-ca' }
    });
  };

  return (
    <AutoComplete
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="Nhập tên bài hát, Nghệ sĩ..."
    />
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearch: (value: string) => dispatch(updateSearchAction(value))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(SearchInputComponent));
