import { PHONE_CHANGE_REQUEST,PHONE_CHANGE_REQUEST_SUCCESS,PAN_CARD_DETAILS_SUBMIT,BANK_DETAILS_SUBMIT,GET_BANK_DETAILS} from '../constants'

export const submitPhoneChangeRequest = (phonechangedata) => {
  const action1 = {
    type: PHONE_CHANGE_REQUEST,
    phonechangedata
  }
  return action1

  const action2 = {
    type: PHONE_CHANGE_REQUEST_SUCCESS,
    
  }
  return action2
  // return {
  //     type: 'PHONE_CHANGE_REQUEST',
  //     action
  // }
}
export const submitPanCardForm = (panCardSubmitdata) => {
  console.log("action",panCardSubmitdata)
  const panDetails = {
    type: PAN_CARD_DETAILS_SUBMIT,
    panCardSubmitdata
  }
  return panDetails
}
export const submitBankDetailForm = (bankDetailData) => {
  const bankDetails = {
    type: BANK_DETAILS_SUBMIT,
    bankDetailData
  }
  return bankDetails
}
export const getBankDetailsData = () => {
  const getbankDetails = {
    type: GET_BANK_DETAILS
  }
  return getbankDetails
}
