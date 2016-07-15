import { takeEvery, delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { USER_VISITED_HOME, USER_VISITED_QUESTION } from '../constants/boilerplate';
import { fetchQuestions, fetchAnswers, fetchAnswer } from '../services/api';
import { questionsHaveLoaded, answersHaveLoaded } from '../actions/boilerplate';

export default function* sideEffects() {
	return yield [
		takeEvery(USER_VISITED_HOME, fetchHomeQuestions),
		takeEvery(USER_VISITED_QUESTION, fetchQuestionAnswers)
	];
}

function *fetchHomeQuestions() {
	let state = yield select();
	if (state.questions.size) return;
	let questions = yield call(fetchQuestions);
	yield put(questionsHaveLoaded({
		questions: questions.items
	}));
}

function *fetchQuestionAnswers({ payload }) {
	let answerIds = yield call(fetchAnswers, payload.questionId);
	let answers = yield answerIds.items.map( item => call(fetchAnswer, item.answer_id) );
	yield put(answersHaveLoaded({
		questionId: payload.questionId,
		answers: answers.reduce(
			(allAnswers, answer) => allAnswers.concat([{
				answer_id: answer.items[0].answer_id,
				userName: answer.items[0].owner.display_name,
				score: answer.items[0].score
			}]), []
		)
	}));
}
