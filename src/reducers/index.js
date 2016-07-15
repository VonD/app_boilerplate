import { combineReducers } from 'redux';
import { Map } from 'immutable';
import { QUESTIONS_HAVE_LOADED, ANSWERS_HAVE_LOADED } from '../constants/boilerplate';

function questionsReducer(state = new Map(), action) {
	switch (action.type) {
		case QUESTIONS_HAVE_LOADED:
			return state.mergeDeep(action.payload.questions.reduce(
				(questionsById, question) => ({
					...questionsById,
					[question.question_id]: question
				}), {}
			));
		default:
			return state;
	}
}

function answersReducer(state = new Map(), action) {
	switch (action.type) {
		case ANSWERS_HAVE_LOADED:
			return state.mergeDeep({
				[action.payload.questionId]: action.payload.answers.reduce(
					(answersById, answer) => ({
						...answersById,
						[answer.answer_id]: answer
					}), {}
				)
			});
		default:
			return state;
	}
}

export default combineReducers({
	questions: questionsReducer,
	answers: answersReducer
});
