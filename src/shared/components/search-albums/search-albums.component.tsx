import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// styles
import './search-albums.scss';

function SearchAlbumsComponent() {

  useEffect(() => {

    return () => { }
  }, [])


  return (
    <div>
      Albums page
    </div>
  );
}

export default withRouter(SearchAlbumsComponent);
