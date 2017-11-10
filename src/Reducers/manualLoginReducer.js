import {
  MANUAL_LOGIN_SUBMIT,
  LOGIN_SUCESSS,
  LOGIN_SUCESSS_REDIRECT
} from '../constants'
import { bake_cookie, read_cookie } from 'sfcookies'
const cookeiesdata = read_cookie('cookeiesdata')

export const manualLoginReducer = (state = [], action) => {
  let users = []
  let userdetailsStore = []
  switch (action.type) {
    case MANUAL_LOGIN_SUBMIT:
      users = [...state]
      return users
    case LOGIN_SUCESSS:
      users = [...state, action.logindata, action.SUCCESS]
      userdetailsStore = {
        master_players_id: action.logindata.data.data.master_players_id,
        is_phone_verified: action.logindata.data.data.is_phone_verified,
        is_user_logged_in: true,
        header: action.logindata.headers
      }
      bake_cookie('cookeiesdata', { userdetailsStore })
      return users
    case LOGIN_SUCESSS_REDIRECT:
      users = [...state, action.logindata, action.SUCCESS]
      userdetailsStore = {
        master_players_id: action.logindata.data.data.master_players_id,
        is_phone_verified: action.logindata.data.data.is_phone_verified,
        is_user_logged_in: true,
        header: action.logindata.headers
      }
      bake_cookie('cookeiesdata', { userdetailsStore })
      return users
    default:
      return state
  }
}
