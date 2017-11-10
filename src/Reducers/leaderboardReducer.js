import { LEADERBOARD_SCREEN } from '../constants';

export const leaderboardReducer = (state = [], action) => {
  let responseLeaderboard = null;
  // console.log(action.leaderboardDetails);
  // console.log(action.leaderboardDetails);
  
  switch (action.type) {
    case LEADERBOARD_SCREEN:
      return state;

    case 'SET_LEADERBOARD_SCREEN_DETAILS':
    console.log(action.leaderboardDetails);
    responseLeaderboard=action.leaderboardDetails;
      return responseLeaderboard;

    default:
      return state;
  }
}
