const QUESTIONS = 'http://api.stackexchange.com/2.2/questions?pagesize=10&order=desc&sort=activity&site=stackoverflow';
const ANSWERS = questionId => `http://api.stackexchange.com/2.2/questions/${ questionId }/answers?order=desc&sort=activity&site=stackoverflow`;
const ANSWER = answerId => `http://api.stackexchange.com/2.2/answers/${ answerId }?order=desc&sort=activity&site=stackoverflow`

export function fetchQuestions() {
	return fetch(QUESTIONS).then( response => response.json() );
}

export function fetchAnswers(questionId) {
	return fetch(ANSWERS(questionId)).then (response => response.json() );
}

export function fetchAnswer(answerId) {
	return fetch(ANSWER(answerId)).then (response => response.json() );
}
