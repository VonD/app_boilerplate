import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Question = ({ question, answers }) => (
	<div className={ 'overlay' }>
		<div className={ 'modal' }>
			<div style={{textAlign: 'right'}}>
				<Link to={ '/' }>&times;</Link>
			</div>
			<div className={ 'title' } dangerouslySetInnerHTML={{__html: question.get('title')}} />
			{
				answers && answers.size ? (
					<ul className={ 'details' }>
						{
							answers.map( (answer, answerId) => (
								<li key={ answerId }>
									<span dangerouslySetInnerHTML={{__html: answer.get('userName') }} />: { answer.get('score') }
								</li>
							)).valueSeq()
						}
					</ul>
				) : (
					answers ? (
						<span className={ 'details' }>No answers yet</span>
					) : <span>…</span>
				)
			}
		</div>
	</div>
);

export default connect(
	(state, props) => ({
		question: state.questions.get(props.params.questionId),
		answers: state.answers.get(props.params.questionId)
	})
)(Question);
