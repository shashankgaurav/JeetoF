import { LANGUAGE_UPDATE } from '../constants'

export const updateLanguage = language => {
  const action = {
    type: LANGUAGE_UPDATE,
    language
  }
  return action
}
