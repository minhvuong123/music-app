
import { NavLink } from 'react-router-dom';

// styles
import './category.scss';
import { apiLink } from 'shared/const';
import { ComponentModel } from 'shared/model';

function CategoryAlbum({ category }: ComponentModel) {
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
