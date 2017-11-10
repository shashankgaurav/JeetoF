import { LEADERBOARD_SCREEN } from '../constants';

export const leaderboardAction = (pageNumber) => {
  console.log("In action")
   const action = {
     type: LEADERBOARD_SCREEN,
   }
   return action;
}
