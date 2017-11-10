import {WITHDRAW_MONEY_REQUEST} from '../constants';

export const withdrawMoneyAction = (withdrawMoneyData) => {
  console.log("action",withdrawMoneyData)
   const action = {
     type: WITHDRAW_MONEY_REQUEST,
     withdrawMoneyData
   }
   return action;
}