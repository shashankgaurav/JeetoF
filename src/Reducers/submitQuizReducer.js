import { SUBMIT_QUIZ } from '../constants';

export const submitQuizReducer = (state = [], action) => {
  let submit = null;
  switch (action.type) {
    case SUBMIT_QUIZ:
      submit = action.submit_quiz_url;
      return submit;

    default:
      return state;
  }
}
