import { SUBMIT_QUIZ } from '../constants';

export const submitQuizAction = (submit_quiz_url, quizPayload) => {

  const action = {
    type: SUBMIT_QUIZ,
    submit_quiz_url,
    quizPayload
  }
  console.log(action);
  return action;
}
