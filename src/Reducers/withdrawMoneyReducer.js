import {
  WITHDRAW_MONEY_REQUEST,
  WITHDRAW_MONEY_REQUEST_SUCCESS,
  FETCH_ERROR
} from '../constants'

export const withdrawMoneyReducer = (state = [], action) => {
  switch (action.type) {
    case 'WITHDRAW_MONEY_REQUEST':
      return action

    case 'WITHDRAW_MONEY_REQUEST_SUCCESS':
      return action

      default:
      return state
  }
}
export const withdrawErrorReducer = (state = [], action) => {
  console.log("in error reducer",action)
  let users = []
  switch (action.type) {
    case 'FETCH_ERROR':
    users = [action.error]
    console.log(users)
    return users

      default:
      return state
  }
}  
