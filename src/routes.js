import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, IndexRoute, Route, applyRouterMiddleware } from 'react-router';
import manageScroll from 'react-router-scroll';
import { userVisitedHome, userVisitedQuestion } from './actions/boilerplate';

import Layout from './components/layout';
import Home from './components/home';
import Question from './components/question';

export default function(browserHistory) {
	return dispatch => (
		<Router
		    history={ browserHistory }
		    render={ applyRouterMiddleware(manageScroll()) }
		>
			<Route path={ '/' } component={ Layout }>
				<IndexRoute component={ Home } onEnter={ () => dispatch(userVisitedHome()) } />
				<Route path={ 'question' } component={ Home } onEnter={ () => dispatch(userVisitedHome()) }>
					<Route path={ ':questionId' } component={ Question } onEnter={ location => dispatch(userVisitedQuestion({questionId: location.params.questionId})) } />
				</Route>
			</Route>
		</Router>
	);
}
