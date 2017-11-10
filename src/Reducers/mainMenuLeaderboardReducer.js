import {MAIN_MENU_LEADERBOARD_DETAILS, FETCH_ERROR ,MAIN_MENU_LEADERBOARD_DETAILS_SUCCESS} from '../constants'

export const mainMenuLeaderboardReducer = (state = [], action) => {
  let leaderboardDetails = []
  switch (action.type) {
    case 'MAIN_MENU_LEADERBOARD_DETAILS':
      leaderboardDetails = [...state,action.leaderboardDetails]
      return leaderboardDetails

    case 'FETCH_ERROR':
      leaderboardDetails = [action.error]
      return leaderboardDetails

    case 'MAIN_MENU_LEADERBOARD_DETAILS_SUCCESS':
      leaderboardDetails = [...state, action]
      return leaderboardDetails

    default:
      return state
  }
}
