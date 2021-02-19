import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainComponent from 'components/main/Main.component';
import AlbumDetail from 'components/albumDetail/AlbumDetail.component';

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
    keyPath: 'root',
    exact: true,
    component: AlbumDetail
  }
]

export default Routes;