import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Router, IndexRoute, Route, applyRouterMiddleware } from 'react-router';
import manageScroll from 'react-router-scroll';
import { userVisitedHome, userVisitedQuestion } from '../actions/boilerplate';

import Layout from './layout';
import Home from './home';
import Question from './question';

class App extends Component {
	render() {
		return (
			<Router
			    history={ browserHistory }
			    render={ applyRouterMiddleware(manageScroll()) }
			>
				<Route path={ '/' } component={ Layout }>
					<IndexRoute component={ Home } onEnter={ this.props.userVisitedHome } />
					<Route path={ 'question' } component={ Home } onEnter={ this.props.userVisitedHome }>
						<Route path={ ':questionId' } component={ Question } onEnter={ location => this.props.userVisitedQuestion(location.params.questionId) } />
					</Route>
				</Route>
			</Router>
		);
	}
}

export default connect(
	null,
	dispatch => ({
		userVisitedHome: () => dispatch(userVisitedHome()),
		userVisitedQuestion: questionId => dispatch(userVisitedQuestion({ questionId }))
	})
)(App);
