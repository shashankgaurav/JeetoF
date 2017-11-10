import { HOME_SCREEN, PROFILE_SUCESSS } from '../constants';

export const homeScreenReducer = (state = [], action) => {
  let userProfile = [];
  let userdata = [];
  console.log("reducer",action)
  switch (action.type) {
    case HOME_SCREEN:
     userProfile = [...state,action.homeScreenData]
     console.log(userProfile)
      return userProfile
    case PROFILE_SUCESSS:
    console.log("in reduce api call")
    userProfile = action.profileData
      return userProfile

    default:
      return state
  }
}
