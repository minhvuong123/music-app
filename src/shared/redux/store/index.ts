import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'shared/redux/reducers';
import rootSaga from '../sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware() as any;
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
    )
  );
  sagaMiddleware.run(rootSaga)
  return store;
}

export default configureStore;