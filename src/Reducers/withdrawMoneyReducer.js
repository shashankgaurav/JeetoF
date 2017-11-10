import {WITHDRAW_MONEY_REQUEST,WITHDRAW_MONEY_REQUEST_SUCCESS} from '../constants';

export const withdrawMoneyReducer = (state = [], action) => {
  switch (action.type) {
    case 'WITHDRAW_MONEY_REQUEST':
      console.log("with draw Reducer",action)
      return action;

    case 'WITHDRAW_MONEY_REQUEST_SUCCESS':
      console.log("with draw saga response",action)
      return action;
      
    default:
      return state;
  }
}
