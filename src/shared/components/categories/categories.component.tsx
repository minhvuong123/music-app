import { useEffect, useState } from 'react';

// assets
import { apiLink } from 'shared/const';
import axios from 'axios';

// styles
import './categories.scss';
import CategoryComponent from '../category/category.component';
import { CategoryModel } from 'shared/model';


function CategoriesComponent() {
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
    return () => {}
  }, []);

  return (
    <div className="categories__container">
      { categories && categories.map((category: CategoryModel) => <CategoryComponent key={ category._id } category={ category } />) }
    </div>
  );
}

export default CategoriesComponent;
