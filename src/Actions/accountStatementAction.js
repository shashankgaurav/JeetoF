import {GET_USER_ACCOUNT_STATEMENT,GET_BONUS_ACCOUNT_STATEMENT,GET_WINNING_ACCOUNT_STATEMENT} from '../constants';

export const userAccountStatementAction = (accountStatementData) => {
  console.log(accountStatementData)
   const action = {
     type: GET_USER_ACCOUNT_STATEMENT,
     accountStatementData
   }
   return action;
}