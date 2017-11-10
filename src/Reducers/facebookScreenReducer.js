import {
  GET_FACEBOOK_REQUEST,
  FACEBOOK_SUCCESS_REDIRECT,
  FACEBOOK_SUCCESS,
  FACEBOOK_SUCCESS_AFTER_LOGIN
} from '../constants'
import { bake_cookie, read_cookie } from 'sfcookies'
import { reactLocalStorage } from 'reactjs-localstorage'
export const facebookReducer = (state = [], action) => {
  const cookeiesdata = read_cookie('cookeiesdata')
  let users = []
  let userdetailsStore = []
  // Reducer
  switch (action.type) {
    case GET_FACEBOOK_REQUEST:
      users = [...state]
      return users
    case FACEBOOK_SUCCESS:
      userdetailsStore = {
        master_players_id: action.payloadresponse.data.data.master_players_id,
        is_phone_verified: action.payloadresponse.data.data.is_phone_verified,
        firstUserExperience: action.payloadresponse.data.data
          .firstUserExperience,
        Stage: action.payloadresponse.data.data.Stage,
        header: action.payloadresponse.headers,
        register: 'facebook'
      }
      users = [...state, action.payloadresponse.data, action.SUCCESS]
      bake_cookie('cookeiesdata', { userdetailsStore })
      return users
    case FACEBOOK_SUCCESS_REDIRECT:
      userdetailsStore = {
        master_players_id: action.payloadresponse.data.data.master_players_id,
        is_phone_verified: action.payloadresponse.data.data.is_phone_verified,
        is_user_logged_in: true,
        header: action.payloadresponse.headers
      }
      users = [...state, action.payloadresponse.data, action.SUCCESS]
      bake_cookie('cookeiesdata', { userdetailsStore })
      return users
    case FACEBOOK_SUCCESS_AFTER_LOGIN:
      console.log('FACEBOOK_SUCCESS_AFTER_LOGIN')
      console.log(cookeiesdata)
      userdetailsStore = {
        master_players_id: action.payloadresponse.data.data.master_players_id,
        is_phone_verified: action.payloadresponse.data.data.is_phone_verified,
        is_user_logged_in: true,
        header: cookeiesdata.userdetailsStore.header,
        firstUserExperience: cookeiesdata.userdetailsStore.firstUserExperience,
        Stage: cookeiesdata.userdetailsStore.Stage,
        register: 'facebook'
      }
      console.log(userdetailsStore)
      users = [...state, action.payloadresponse.data, action.SUCCESS]
      bake_cookie('cookeiesdata', { userdetailsStore })
      return users
    default:
      return state
  }
}
