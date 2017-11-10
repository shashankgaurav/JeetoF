import { PAY_TABLE } from '../constants';

export const payTableAction = (payload) => {
   const action = {
     type: PAY_TABLE,
     payload

   }
   return action;
}
