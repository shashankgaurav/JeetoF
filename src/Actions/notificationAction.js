import { DISPLAY_ALL_NOTIFICATIONS } from '../constants';

export const notificationAction = () => {
  console.log("In notificationAction")
   const action = {
     type: DISPLAY_ALL_NOTIFICATIONS,
   }
   return action;
}
