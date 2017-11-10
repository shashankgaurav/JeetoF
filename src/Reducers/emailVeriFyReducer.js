import {EMAIL_CHANGE_SUBMIT,EMAIL_VERIFY_SUCCESS} from '../constants';

export const emailVerifyReducer = (state = [], action) => {
  switch (action.type) {
    case 'EMAIL_CHANGE_SUBMIT':
      console.log("Email Reducer",action)
      return action;
    case 'EMAIL_VERIFY_SUCCESS':
      console.log("Email SUCCESS Reducer",action)
      return action;

    default:
      return state;
  }
}
