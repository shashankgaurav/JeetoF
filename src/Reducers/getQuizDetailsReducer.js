import { GET_QUIZ, QUIZ_FETCH_SUCCESS, QUIZ_FETCH_ERROR } from '../constants';

export const getQuizReducer = (state = [], action) => {
  let quizData = [];
  switch (action.type) {

    case GET_QUIZ:
      quizData=action.quizPayload;
      return quizData;

    default:
      return state;
  }
}

export const setQuizReducer = (state = [], action) => {
  let quizResponse;
  switch (action.type) {

    case QUIZ_FETCH_SUCCESS:
          quizResponse = action.response.data.data;
          console.log(quizResponse);
          return quizResponse;

    case QUIZ_FETCH_ERROR:
        quizResponse = action.e;
        return quizResponse;

    default:
            return state;
          }
        }
