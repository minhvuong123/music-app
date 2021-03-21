import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// styles
import './category.scss';
import { apiLink } from 'shared/const';

function CategoryAlbum({ category }: any) {
  const token = localStorage.getItem('token') as string;
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    jwt.verify(token, 'kiwi', async function (err, decoded: any) {
      if (!err) {
        setUser(decoded._doc);
      }
    });
  }, [category, token])

  return (
    <div className="cateogory__container">
      <NavLink to={{
        pathname: `/category/${category.category_slug}`,
        state: { categoryId: category._id }
      }} className="block">
        {
          <div className="block__images">
            <img src={`${apiLink}/${category.category_url_image}`} alt="music app" />
          </div>
        }
        <div className="block__opacity"></div>
      </NavLink>
    </div>
  );
}

export default CategoryAlbum;
