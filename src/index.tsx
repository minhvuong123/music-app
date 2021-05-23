import ReactDOM from 'react-dom';
import App from 'shared/components/app/app.component';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './shared/redux/store';
import { Provider } from 'react-redux';

import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

