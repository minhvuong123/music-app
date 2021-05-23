import { useEffect, useState } from 'react';

// components
import Album from 'shared/components/album/album.component';
import SlideList from 'shared/components/slide-list/slide-list.component';

// icons
import { RightOutlined } from '@ant-design/icons';

// assets
import { apiLink } from 'shared/const';
import axios from 'axios';

// styles
import './hub.scss';
import { NavLink } from 'react-router-dom';
import { ComponentModel } from 'shared/model';


function HubComponent({ category }: ComponentModel) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const resultCategories = await axios.get(`${apiLink}/categories`);

      if (resultCategories && resultCategories.data && resultCategories.data.categories) {
        for (const [index, category] of resultCategories.data.categories.entries()) {
          const albums = await axios.get(`${apiLink}/albums/category/${category._id}/${6}`);
          resultCategories.data.categories[index].albums = albums.data.albums;
        }
      }

      setCategories(resultCategories.data.categories);
    }

    loadData();

  }, []);

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
      {
        categories
        && categories.map((category: any) => (
          <div key={category._id}>
            <NavLink to={{
              pathname: `/category/${category.category_slug}`,
              state: { categoryId: category._id }
            }} className="category__link">
              {category.category_name}
              <span className="ml__10"><RightOutlined /></span>
            </NavLink>
            <SlideList slideSetting={settings}>
              <div>
                {
                  category.albums.map((album: any) => {
                    return (
                      <div key={album._id} className="pl__10 pr__10">
                        <Album album={album} />
                      </div>
                    )
                  })
                }
              </div>
            </SlideList>
          </div>
        ))
      }
    </div>
  );
}

export default HubComponent;
