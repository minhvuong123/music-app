import { useState } from 'react';
import { personalMenu } from 'shared/const';
import { ComponentModel } from 'shared/model';

// styles scss
import './personal-menu.scss';

function PersonalMenu({ getMenu }: ComponentModel ) {
  const [name, setName] = useState('tong_quan');

  function changeMenu(e: any, value: string) {
    e.preventDefault();
    setName(value);
    getMenu(value);
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


export default PersonalMenu;
