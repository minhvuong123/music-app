import { useState, useEffect } from 'react';
import SearchNavComponent from 'shared/components/search-nav/search-nav.component';

// styles
import './search.scss';

import Routes, { RenderRoutes } from 'routes/routes';
import { ComponentModel } from 'shared/model';

function SearchComponent({ match }: ComponentModel) {
  const [nestedRoutes, setNestedRoutes] = useState([]);

  useEffect(() => {
    const nestRoutes = Routes.find(route => route.path === match.path)?.nested;
    setNestedRoutes(nestRoutes as any);
    return () => {}
  }, [match.path])

  return (
    <div className="search__container">
      <div className="search__header">
        <h3 className="header__title">Kết Quả Tìm Kiếm</h3>
        <SearchNavComponent />
      </div>
      <div className="search__nested_routes">
        <RenderRoutes routes={nestedRoutes} />
      </div>
    </div>
  );
}


export default SearchComponent;
