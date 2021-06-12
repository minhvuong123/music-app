import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiLink } from 'shared/const';
import axios from 'axios';

import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";

// scss
import './admin-content.scss';
import _ from 'lodash';
import { setContentChangeStatus } from 'shared/redux/actions';
import { ComponentModel } from 'shared/model';

function AdminContent({ tabStatus, contentStatus, setContentChangeStatus }: ComponentModel) {
  const [albumsDisable, setAlbumsDisable] = useState<any>([]);
  const [albumsEnable, setAlbumsEnable] = useState<any>([]);
  const [status] = useState<any>(false);

  useEffect(() => {
    async function loadData() {
      const resultAlbumsDisable = await axios.get(`${apiLink}/albumList/status/${false}`);
      if (resultAlbumsDisable && resultAlbumsDisable.data && resultAlbumsDisable.data.albumList) {
        setAlbumsDisable(resultAlbumsDisable.data.albumList);
      }

      const resultAlbumsEnable = await axios.get(`${apiLink}/albumList/status/${true}`);
      if (resultAlbumsEnable && resultAlbumsEnable.data && resultAlbumsEnable.data.albumList) {
        setAlbumsEnable(resultAlbumsEnable.data.albumList);
      }
    }

    loadData();

    return () => { }
  }, [tabStatus]);

  function handleAlbumAdd(albumt: any) {
    const albumsT = albumsDisable.filter((album: any) => album._id !== albumt._id);
    setAlbumsDisable(albumsT);

    const albumsS = _.cloneDeepWith(albumsEnable)
    albumt.albumList_status = true;
    albumsS.push(albumt);
    setAlbumsEnable(albumsS);
  }

  function handleAlbumARemove(albumt: any) {
    const albumsS = albumsEnable.filter((album: any) => album._id !== albumt._id);
    setAlbumsEnable(albumsS);

    const albumsT = _.cloneDeepWith(albumsDisable);
    albumt.albumList_status = false;
    albumsT.push(albumt);
    setAlbumsDisable(albumsT);
  }

  function handleShowUI() {
    // eslint-disable-next-line array-callback-return
    const payLoad = [...albumsEnable, ...albumsDisable].map(album => {
      return {
        _id: album._id,
        albumList_status: album.albumList_status
      }
    })

    axios.patch(`${apiLink}/albumList/status`, { albums: payLoad }).then(result => {
      // handle to success message
      setContentChangeStatus(!contentStatus);
      
    })
  }

  return (
    <div className="admin_content">
      <div className="content_container">
        <div className="content_left">
          <h3 className="title">Display Albums</h3>
          <div className="albums">
            {
              albumsEnable && albumsEnable.map((albums: any) => (
                <div
                  key={albums._id}
                  onClick={() => handleAlbumARemove(albums)}
                  className="albums_item"
                >
                  {albums.albumList_name}
                  <div className="btn_add"><AiOutlineLine /></div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="line"></div>
        <div className="content_right">
          <h3 className="title">Available Albums</h3>
          <div className="available">
            {
              albumsDisable && albumsDisable.map((albumt: any) => (
                <div
                  key={albumt._id}
                  onClick={() => handleAlbumAdd(albumt)}
                  className="avaible_item"
                >
                  {albumt.albumList_name}
                  <div className="btn_add"><AiOutlinePlus /></div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="actions">
        <div onClick={handleShowUI} className={`btn_apply ${status ? 'disable' : ''}`}>
          Apply
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ status }: any) => {
  return {
    contentStatus: status.contentStatus
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setContentChangeStatus: (status: boolean) => dispatch(setContentChangeStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);
