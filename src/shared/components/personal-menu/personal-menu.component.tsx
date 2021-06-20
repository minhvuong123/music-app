import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { personalMenu } from 'shared/const';
import { ComponentModel } from 'shared/model';

// styles scss
import './personal-menu.scss';

function PersonalMenu({ history }: ComponentModel) {
  const [name, setName] = useState('tong-quan');

  function changeMenu(e: any, value: string) {
    e.preventDefault();
    history.push({
      pathname: `/my-music/${value}`
    });
    setName(value);
  }
  return (
    <ul className="personal__nav">
      {
        personalMenu.map(p => (
          <li key={p.key} className={`${name === p.key ? "active" : ""}`}>
            <a href="/" onClick={(e) => changeMenu(e, p.key)}>{p.value}</a>
          </li>
        ))
      }
    </ul>
  );
}


export default withRouter(PersonalMenu);
