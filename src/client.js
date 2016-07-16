import React from 'react';
import { render } from 'react-dom';
import { fromJS } from 'immutable';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import createSagaMiddleware from 'redux-saga';
import sideEffects from './side_effects';

const sagaMiddleware = createSagaMiddleware();
let initialState = window.__INITIAL_STATE__ || {};
const store = createStore(reducers, {
	questions: fromJS(initialState.questions || {}),
	answers: fromJS(initialState.answers || {})
}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sideEffects);

if (process.env.NODE_ENV === 'development') window.store = store;

import { browserHistory } from 'react-router';
import defineRoutes from './routes';

const routes = defineRoutes(browserHistory);

import './components/style/app.less';

render(
	<Provider store={ store }>
		{ routes( action => store.dispatch(action) ) }
	</Provider>,
	document.getElementById('app')
);
