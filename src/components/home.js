import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const App = ({ questions, children })  => {
	return questions && questions.size ? (
		<div className={ 'questions' }>
			{
				questions.map( (question, questionId) => (
					<Link key={ questionId } to ={ `/question/${ questionId }` }>
						<div className={ 'question-preview' }>
							<div className={ 'title' } dangerouslySetInnerHTML={{__html: question.get('title')}} />
							<div className={ 'details' }>
								<span>{ question.get('view_count') } { question.get('view_count') === 1 ? 'view' : 'views' }</span>
								<span className={ 'sep' }>•</span>
								<span>{ question.get('answer_count') } { question.get('answer_count') === 1 ? 'answer' : 'answers' }</span>
							</div>
						</div>
					</Link>
				)).valueSeq()
			}
			{ children }
		</div>
	) : (
		<div className={ 'loading' }>Loading…</div>
	);
};

export default connect(
	state => ({
		questions: state.questions
	})
)(App);
