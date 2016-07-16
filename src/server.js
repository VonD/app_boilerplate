import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { match, RouterContext } from 'react-router';
import defineRoutes from './routes';
const routes = defineRoutes();

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import sideEffects from './side_effects';

GLOBAL.fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

let templatePage = ({ appString, initialState }) => `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>App</title>
	</head>
	<body>
		<div id="app">${ appString }</div>
		<script>window.__INITIAL_STATE__ = ${ initialState };</script>
		<script src="http://localhost:8080/assets/client.js"></script>
	</body>
</html>
`;

app.use('/favicon.ico', (req, res) => res.end());

app.use( (req, res, next) => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducers, applyMiddleware(sagaMiddleware));
	const fetchData = sagaMiddleware.run(sideEffects);
	match({
		routes: routes(action => store.dispatch(action)),
		location: req.url
	}, (error, redirectLocation, renderProps) => {
		if (error) {
			store.dispatch(END);
			return res.status(500).send(error.message);
		} else if (redirectLocation) {
			store.dispatch(END);
			return res.status(302).redirect([redirectLocation.pathname, redirectLocation.search].join(''));
		} else {
			fetchData.done.then( () => {
				let appString = renderToString(
					<Provider store={ store }>
						<RouterContext { ...renderProps } />
					</Provider>
				);
				res.status(200).end(templatePage({
					appString,
					initialState: JSON.stringify(store.getState())
				}));
			});
			store.dispatch(END);
		}
	});
});

app.listen(port);
