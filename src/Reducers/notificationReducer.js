import { DISPLAY_ALL_NOTIFICATIONS } from '../constants';

export const notificationReducer = (state = [], action) => {
  let notificationResponse = null;
  console.log("notificationReducer");
  // console.log(action.leaderboardDetails);
  
  switch (action.type) {
    case DISPLAY_ALL_NOTIFICATIONS:
      return state;

    case 'SET_ALL_NOTIFICATIONS':
    notificationResponse=action.notificationDetails;
      return notificationResponse;

    default:
      return state;
  }
}
