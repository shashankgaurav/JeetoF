import {MAIN_MENU_LEADERBOARD_DETAILS} from '../constants';

export const mainMenuLeaderboardDetails = (leaderboardDetails) => {
    const action = {
      type: MAIN_MENU_LEADERBOARD_DETAILS,
      leaderboardDetails
    }
    return action;
 }
 