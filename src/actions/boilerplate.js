import {
	USER_VISITED_HOME,
	USER_VISITED_QUESTION,
	QUESTIONS_HAVE_LOADED,
	ANSWERS_HAVE_LOADED
} from '../constants/boilerplate';

export const userVisitedHome = () => ({
	type: USER_VISITED_HOME,
	payload: {}
});

export const userVisitedQuestion = ({ questionId }) => ({
	type: USER_VISITED_QUESTION,
	payload: {
		questionId
	}
});

export const questionsHaveLoaded = ({ questions }) => ({
	type: QUESTIONS_HAVE_LOADED,
	payload: {
		questions
	}
});

export const answersHaveLoaded = ({ questionId, answers }) => ({
	type: ANSWERS_HAVE_LOADED,
	payload: {
		questionId,
		answers
	}
});
