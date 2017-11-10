import { LANGUAGE_UPDATE } from '../constants'

export const languageReducer = (state = [], action) => {
  let languageUpdate = null
  switch (action.type) {
    case LANGUAGE_UPDATE:
      languageUpdate = action.language
      return languageUpdate
    default:
      return state
  }
}
