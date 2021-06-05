
import { NavLink } from 'react-router-dom';

import { RightOutlined } from '@ant-design/icons';

// styles
import './category.scss';
import { AlbumModel, ComponentModel } from 'shared/model';
import SlideList from 'shared/components/slide-list/slide-list.component';
import CategoryAlbumComponent from '../category-album/category-album.component';

function CategoryComponent({ category }: ComponentModel) {
  const settings = {
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="category__container">
      <NavLink to={{
        pathname: `/category/${category.category_slug}`,
        state: { categoryId: category._id }
      }} className="category__link">
        {category.category_name}
        <span className="ml__10"><RightOutlined /></span>
      </NavLink>
      <SlideList slideSetting={settings}>
        <div>
          { category.albums.map((album: AlbumModel) => <CategoryAlbumComponent key={album._id} album={album} />) }
        </div>
      </SlideList>
    </div>
  );
}

export default CategoryComponent;
