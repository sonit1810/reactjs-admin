import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
// import { routerReducer, routerMiddleware } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history),
        form: formReducer
    }),
    composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);
export { store, history };