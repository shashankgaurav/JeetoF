import {
  PHONE_NUMBER_SUBMIT,
  UPDATE_SUCCESS,
  VERIFY_OTP,
  OTP_SUCCESS,
  PHONE_CHANGE_REQUEST_SUBMIT,
  FETCH_ERROR
} from '../constants'
import { bake_cookie, read_cookie } from 'sfcookies'
export const varificationReducer = (state = [], action) => {
  let users = []
  let userdetailsStore = []
  let phoneChangedata = []
  let cookeiesdata = read_cookie('cookeiesdata')
  switch (action.type) {
    case 'PHONE_NUMBER_SUBMIT':
      users = [...state]
      return users
    case 'UPDATE_SUCCESS':
      users = [...state, action.userResponse, action.SUCCESS]
      return users
    case 'VERIFY_OTP':
      users = [...state]
      return users
    case 'OTP_SUCCESS':
      users = [...state, action.SUCCESS]
      userdetailsStore = {
        master_players_id: cookeiesdata.userdetailsStore.master_players_id,
        is_phone_verified: true,
        is_user_logged_in: true,
        firstUserExperience: cookeiesdata.userdetailsStore.firstUserExperience,
        Stage: cookeiesdata.userdetailsStore.Stage,
        header: cookeiesdata.userdetailsStore.header,
        register: cookeiesdata.userdetailsStore.register
      }
      console.log(userdetailsStore)
      bake_cookie('cookeiesdata', { userdetailsStore })
      return users
      case 'PHONE_CHANGE_REQUEST_SUBMIT':
      phoneChangedata = action.phonechangedata
      return phoneChangedata
      case 'PHONE_CHANGE_REQUEST_SUCCESS':
      phoneChangedata = [...state]
      return [];
    default:
      return state
  }
}

export const varificationErrorReducer = (state = [], action) => {
  console.log("in valdation reducer",action)
  let users = []
  switch (action.type) {
    case 'FETCH_ERROR':
    users = [action.error]
    return users

      default:
      return state
  }
}  
