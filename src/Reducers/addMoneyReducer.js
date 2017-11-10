import { CALL_PAYTM } from '../constants'

export const addMoneyReducer = (state = [], action) => {
  let paymentdata = null
  switch (action.type) {
    case CALL_PAYTM:
      paymentdata = [action.paydata]
      return paymentdata

    default:
      return state
  }
}
