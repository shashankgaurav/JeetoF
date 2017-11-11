import {GET_USER_ACCOUNT_STATEMENT,GET_BONUS_ACCOUNT_STATEMENT,GET_WINNING_ACCOUNT_STATEMENT,ACCOUNT_DATA} from '../constants';

export const userAccountStatementReducer = (state = [], action) => {
  let users=[]
  
  switch (action.type) {
    case 'GET_USER_ACCOUNT_STATEMENT':
      console.log("User Reducer",action)
      return action;
    case 'ACCOUNT_DATA':
      console.log("User Reducer1",action)
      users=[action]
      return users;

    default:
      return state;
  }
}
