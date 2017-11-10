import { GET_QUIZ } from '../constants';

export const getQuizAction = (quizPayload) => {
  console.log("Inside Action");
  return {
    type: GET_QUIZ,
    quizPayload
  }
}
