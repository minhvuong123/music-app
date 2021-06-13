import { useEffect, useState } from 'react';

// styles
import './category-album.scss';
import { AlbumModel, ComponentModel } from 'shared/model';
import Album from '../album/album.component';
import _ from 'lodash';

function CategoryAlbumComponent({ album, updateAlbum, deleteAlbum }: ComponentModel) {
  const [currentAlbum, setCurrentAlbum] = useState({} as AlbumModel);

  useEffect(() => {
    if (_.isEmpty(currentAlbum)) {
      setCurrentAlbum(album);
    }
    return () => {}
  }, [album, currentAlbum, setCurrentAlbum])

  function updateAlbumCurrent(payLoad: AlbumModel) {
    const result = {...currentAlbum, ...payLoad};
    setCurrentAlbum(result);
    updateAlbum && updateAlbum(currentAlbum._id, payLoad);
  }

  return (
    <div className="pl__10 pr__10">
      <Album album={currentAlbum} updateAlbum={updateAlbumCurrent} deleteAlbum={deleteAlbum} />
    </div>
  );
}

export default CategoryAlbumComponent;
