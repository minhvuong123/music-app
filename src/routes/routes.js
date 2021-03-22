import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainComponent from 'shared/components/main/Main.component';
import AlbumDetail from 'shared/components/albumDetail/AlbumDetail.component';
import Personal from 'shared/components/personal/Personal.component';
import CategoryAlbumDetail from 'shared/components/categoryDetail/categoryDetail.component';
import HubComponent from 'shared/components/hub/Hub.component';

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
    path: '/kham-pha',
    keyPath: '/kham-pha',
    exact: true,
    component: MainComponent
  },
  {
    path: '/category',
    keyPath: '/category',
    exact: true,
    component: HubComponent
  },
  {
    path: '/category/:name',
    keyPath: '/category/:name',
    exact: true,
    component: CategoryAlbumDetail
  }
]

export default Routes;