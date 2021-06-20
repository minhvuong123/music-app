import { Route, Switch } from 'react-router-dom';


import MainComponent from 'shared/components/main/main.component';
import AlbumDetail from 'shared/components/albumDetail/album-detail.component';
import Personal from 'shared/components/personal/personal.component';
import CategoryAlbumDetail from 'shared/components/categoryDetail/categoryDetail.component';
import CategoriesComponent from 'shared/components/categories/categories.component';
import NewSongsComponent from 'shared/components/newSongs/new-songs.component';
import RegisterComponent from 'shared/components/register/register.component';
import LoginComponent from 'shared/components/login/login.component';
import SearchComponent from 'shared/components/search/search.component';
import SearchMainComponent from 'shared/components/search-main/search-main.component';
import SearchSongsComponent from 'shared/components/search-songs/search-songs.component';
import SearchAlbumsComponent from 'shared/components/search-albums/search-albums.component';
import PersonalGeneral from 'shared/components/personal-general/personal-general.component';
import PersonalSongs from 'shared/components/person-songs/personal-songs.component';
import PersonalAlbums from 'shared/components/personal-albums/personal-albums.component';

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        return <route.component {...props} keyPath={route.keyPath} routes={route.nested} />
      }} 
    />
  );
}

export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {
        routes.map((route) => {
          return <RouteWithSubRoutes key={route.keyPath} {...route} />
        })
      }
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

const Routes = [
  {
    path: '/',
    keyPath: 'root',
    exact: true,
    component: MainComponent
  },
  {
    path: '/album/:name',
    keyPath: '/album/:name',
    exact: true,
    component: AlbumDetail
  },
  {
    path: '/my-music',
    keyPath: '/my-music',
    exact: false,
    component: Personal,
    nested: [
      {
        path: '/my-music/tong-quan',
        keyPath: '/my-music/tong-quan',
        exact: false,
        component: PersonalGeneral
      },
      {
        path: '/my-music/bai-hat',
        keyPath: '/my-music/bai-hat',
        exact: false,
        component: PersonalSongs
      },
      {
        path: '/my-music/play-list',
        keyPath: '/my-music/play-list',
        exact: false,
        component: PersonalAlbums
      }
    ]
  },
  {
    path: '/kham-pha',
    keyPath: '/kham-pha',
    exact: true,
    component: MainComponent
  },
  {
    path: '/category',
    keyPath: '/category',
    exact: true,
    component: CategoriesComponent
  },
  {
    path: '/moi-phat-hanh',
    keyPath: '/moi-phat-hanh',
    exact: true,
    component: NewSongsComponent
  },
  {
    path: '/category/:name',
    keyPath: '/category/:name',
    exact: true,
    component: CategoryAlbumDetail
  },
  {
    path: '/register',
    keyPath: '/register',
    exact: true,
    component: RegisterComponent
  },
  {
    path: '/login',
    keyPath: '/login',
    exact: true,
    component: LoginComponent
  },
  {
    path: '/tim-kiem',
    keyPath: '/tim-kiem',
    exact: false,
    component: SearchComponent,
    nested: [
      {
        path: '/tim-kiem/tat-ca',
        keyPath: '/tim-kiem/tat-ca',
        exact: false,
        component: SearchMainComponent
      },
      {
        path: '/tim-kiem/bai-hat',
        keyPath: '/tim-kiem/bai-hat',
        exact: false,
        component: SearchSongsComponent
      },
      {
        path: '/tim-kiem/play-list',
        keyPath: '/tim-kiem/play-list',
        exact: false,
        component: SearchAlbumsComponent
      },
      {
        path: '/tim-kiem/nghe-si',
        keyPath: '/tim-kiem/nghe-si',
        exact: false,
        component: SearchAlbumsComponent
      }
    ]
  }
]

export default Routes;