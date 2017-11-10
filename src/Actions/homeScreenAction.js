import { HOME_SCREEN } from '../constants'

export const getProfileData = (homeScreenData) => {
  console.log("action",homeScreenData)
  return {
    type: 'HOME_SCREEN',
    homeScreenData
  }
}
