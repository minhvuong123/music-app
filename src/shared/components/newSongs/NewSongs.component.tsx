import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// components
import Song from 'shared/components/song/Song.component';

// assets
import { songType } from 'shared/types';
import axios from 'axios';
import { apiLink } from 'shared/const';
import { setSongsAction } from 'shared/redux/actions';

// styles scss
// import './main.scss';

function NewSongsComponent({ setSongsAction }: any) {
  const token = localStorage.getItem('token') as string;
  const [songs, setSongs] = useState<any>([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function loadData() {
      jwt.verify(token, 'kiwi', async function (err, decoded: any) {
        if (!err) {
          const resultSongs = await axios.get(`${apiLink}/songs/new`);
          setSongs(resultSongs.data.songs);
    
          const resultAlbums = await axios.get(`${apiLink}/albums/user/${decoded._doc._id}`);
            setAlbums(resultAlbums.data.albums);
        }
      });
    }

    loadData();

    return () => { }
  }, [])

  function callBackPlaySong() {
    setSongsAction(songs);
  }

  return (
    <div className="new__songs">
      {
        songs && songs.map((s: songType) => <Song key={s._id} song={s} albums={albums} callBackPlaySong={callBackPlaySong} />)
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSongsAction: (songs: any) => dispatch(setSongsAction(songs))
  }
}

export default connect(null, mapDispatchToProps)(NewSongsComponent);
