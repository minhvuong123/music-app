import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainComponent from 'components/main/Main.component';
import AlbumDetail from 'components/albumDetail/AlbumDetail.component';
import Personal from 'components/personal/Personal.component';
import CategoryAlbumDetail from 'components/categoryDetail/categoryDetail.component';

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        return <route.component {...props} keyPath={route.keyPath} routes={route.routes} />
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
    exact: true,
    component: Personal
  },
  {
    path: '/category/:name',
    keyPath: '/category/:name',
    exact: true,
    component: CategoryAlbumDetail
  }
]

export default Routes;