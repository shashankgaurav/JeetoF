import { CALL_PAYTM} from '../constants';

export const paytmpayment = (paydata) => {
  console.log('Action');
   const action = {
     type: CALL_PAYTM,
     paydata
   }
   return action;
}