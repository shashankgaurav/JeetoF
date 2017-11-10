import {
  PHONE_CHANGE_REQUEST,
  PHONE_CHANGE_REQUEST_SUCCESS,
  PAN_CARD_DETAILS_SUBMIT,
  BANK_DETAILS_SUBMIT,
  GET_BANK_DETAILS
} from '../constants'
import { bake_cookie, read_cookie } from 'sfcookies'
export const withdrawVarificationReducer = (state = [], action) => {
  let userdetailsStore = []
  let phoneChangeRequest = null
  let phoneChnageRequestStore = []
  let PanSubmitForm = []
  let bankSubmitForm = []
  let cookeiesdata = read_cookie('cookeiesdata')
  switch (action.type) {
    case PHONE_CHANGE_REQUEST:
      userdetailsStore = {
        master_players_id: cookeiesdata.userdetailsStore.master_players_id,
        is_phone_verified: true,
        is_user_logged_in: true,
        firstUserExperience: cookeiesdata.userdetailsStore.firstUserExperience,
        Stage: cookeiesdata.userdetailsStore.Stage,
        header: cookeiesdata.userdetailsStore.header,
        phoneChangeRequest: action.phonechangedata.phoneChangeRequest
      }

      bake_cookie('cookeiesdata', { userdetailsStore })
      phoneChangeRequest = action.phonechangedata

      return phoneChangeRequest
    case PHONE_CHANGE_REQUEST_SUCCESS:
      return []

    case PAN_CARD_DETAILS_SUBMIT:
      PanSubmitForm = action.panCardSubmitdata
      return PanSubmitForm

    case BANK_DETAILS_SUBMIT:
      bankSubmitForm = action.bankDetailData
      return bankSubmitForm

    case GET_BANK_DETAILS:
      return true

    default:
      return state
  }
}
