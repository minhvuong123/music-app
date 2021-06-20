import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';

import PersonalMenu from 'shared/components/personal-menu/personal-menu.component';
import PersonalInfo from '../personal-info/personal-info.component';
import Routes, { RenderRoutes } from 'routes/routes';

// styles scss
import './personal.scss';
import { ComponentModel } from 'shared/model';

function Personal({ history, match }: ComponentModel) {
  const token = localStorage.getItem('token') as string;
  const [nestedRoutes, setNestedRoutes] = useState([]);

  useEffect(() => {
    jwt.verify(token, 'kiwi', function (err, decoded: any) {
      if (err) {
        history.push('/');
      } else {
        const nestRoutes = Routes.find(route => route.path === match.path)?.nested;
        setNestedRoutes(nestRoutes as any);
      }
    });
  }, [token, history, match.path])

  return (
    <div className="personal__container">
      <div className="pb__50 pt__20 w__100 p__relative">
        <PersonalInfo/>
      </div>
      <PersonalMenu />
      <div className="user__page">
        <RenderRoutes routes={nestedRoutes} />
      </div>
    </div>
  );
}


export default withRouter(Personal);
