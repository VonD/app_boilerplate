import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import createSagaMiddleware from 'redux-saga';
import sideEffects from './side_effects';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sideEffects);

if (process.env.NODE_ENV === 'development') window.store = store;

import App from './components/app';

import './components/style/app.less';

render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('app')
);
