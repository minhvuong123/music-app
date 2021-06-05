import { useEffect, useState } from 'react';

// styles
import './category-album.scss';
import { AlbumModel, ComponentModel } from 'shared/model';
import Album from '../album/album.component';
import _ from 'lodash';

function CategoryAlbumComponent({ album }: ComponentModel) {
  const [currentAlbum, setCurrentAlbum] = useState({} as AlbumModel);

  useEffect(() => {
    if (_.isEmpty(currentAlbum)) {
      setCurrentAlbum(album);
    }
    return () => {}
  }, [album, currentAlbum, setCurrentAlbum])

  function updateAlbum(payLoad: AlbumModel) {
    const result = {...currentAlbum, ...payLoad};
    setCurrentAlbum(result);
  }

  return (
    <div className="pl__10 pr__10">
      <Album album={currentAlbum} updateAlbum={updateAlbum} />
    </div>
  );
}

export default CategoryAlbumComponent;
