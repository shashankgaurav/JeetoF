import { takeEvery } from 'redux-saga'
import axios from 'axios'
import { push } from 'react-router-redux'
import { put, call } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { reactLocalStorage } from 'reactjs-localstorage'
import { read_cookie } from 'sfcookies'
import { API_URL } from '../constants'
import ERROR_CODE from '../errorCodes'

let cookeiesdata = read_cookie('cookeiesdata')

export function * changePhoneRequest (phoneChangeRequest) {
  yield put(push('/LoginScreen'))
}
export function * panCardDetailsSubmit (panCardDetailsData) {
  let headersdata = {
    Authorization: cookeiesdata.userdetailsStore.header.authorization
  }
  try {
    const response = yield call(
      axios.post,
      API_URL + 'v1/PlayerBankDetails',
      {
        master_players_id: cookeiesdata.userdetailsStore.master_players_id,
        pan_card_number: panCardDetailsData.panCardSubmitdata.panNumber,
        pan_card_father_name: panCardDetailsData.panCardSubmitdata.fatherName,
        pan_card_full_name: panCardDetailsData.panCardSubmitdata.fullName,
        date_of_birth: panCardDetailsData.panCardSubmitdata.dateOfBirth,
        territory: panCardDetailsData.panCardSubmitdata.stateTerritory
      },
      { headers: headersdata }
    )
    if (
      response.data.messageCode === 'PBD001' ||
      response.data.messageCode === 'PBD014'
    ) {
      let bankDetailsData = response.data.data
      let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
      let jeetoMoneyData = {
        userdata: jeetomoneystore.jeetomoney.userdata,
        metadata: jeetomoneystore.jeetomoney.metadata,
        userBankDetails: bankDetailsData
      }
      reactLocalStorage.setObject('jeetomoneydataweb', {
        jeetomoney: jeetoMoneyData
      })
      yield put(push('/WithdrawVerification'))
    }
  } catch (error) {
    if (error.response) {
      let Error_code = error.response.data.messageCode
      error = ERROR_CODE[Error_code]
      // console.log(error);
      yield put({ type: 'FETCH_ERROR', error })
    }
  }
}
export function * bankDetailsSubmit (bankDetailsData) {
  
  let headersdata = {
    Authorization: cookeiesdata.userdetailsStore.header.authorization
  }
  try {
    const response = yield call(
      axios.post,
      API_URL + 'v1/PlayerBankDetails',
      {
        master_players_id: cookeiesdata.userdetailsStore.master_players_id,
        bank_Name: bankDetailsData.bankDetailData.bankName,
        bank_Branch_Name: bankDetailsData.bankDetailData.bankBranchName,
        account_number: bankDetailsData.bankDetailData.accountNumber,
        account_holder_name: bankDetailsData.bankDetailData.accountHolderName,
        ifsc_code: bankDetailsData.bankDetailData.ifscCode
      },
      { headers: headersdata }
    )
    if (
      response.data.messageCode === 'PBD001' ||
      response.data.messageCode === 'PBD014'
    ) {
      let bankDetailsData = response.data.data
      console.log("sagasdsdsad",bankDetailsData)
      let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
      let jeetoMoneyData = {
        userdata: jeetomoneystore.jeetomoney.userdata,
        metadata: jeetomoneystore.jeetomoney.metadata,
        userBankDetails: bankDetailsData
      }
      reactLocalStorage.setObject('jeetomoneydataweb', {
        jeetomoney: jeetoMoneyData
      })
      yield put(push('/WithdrawVerification'))
    }
  } catch (error) {
    if (error.response) {
      let Error_code = error.response.data.messageCode
      error = ERROR_CODE[Error_code]
      // console.log(error);
      yield put({ type: 'FETCH_ERROR', error })
    }
  }
}
export function * getBankDetails () {
  let headersdata = {
    Authorization: cookeiesdata.userdetailsStore.header.authorization
  }
  try {
    const response = yield call(
      axios.post,
      API_URL + 'v1/PlayerBankDetails',
      {
        master_players_id: cookeiesdata.userdetailsStore.master_players_id
      },
      { headers: headersdata }
    )
    if (
      response.data.messageCode === 'PBD001' ||
      response.data.messageCode === 'PBD014'
    ) {
      let bankDetailsData = response.data.data
      console.log("bank saga data",bankDetailsData)
      let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
      let jeetoMoneyData = {
        userdata: jeetomoneystore.jeetomoney.userdata,
        metadata: jeetomoneystore.jeetomoney.metadata,
        userBankDetails: bankDetailsData
      }
      reactLocalStorage.setObject('jeetomoneydataweb', {
        jeetomoney: jeetoMoneyData
      })
      yield put(push('/WithdrawVerification'))
    }
  } catch (error) {
    if (error.response) {
      let Error_code = error.response.data.messageCode
      error = ERROR_CODE[Error_code]
      // console.log(error);
      yield put({ type: 'FETCH_ERROR', error })
    }
  }
}


export function * watchWithdrawVerification () {
  yield takeEvery('PHONE_CHANGE_REQUEST', changePhoneRequest)
  yield takeEvery('PAN_CARD_DETAILS_SUBMIT', panCardDetailsSubmit)
  yield takeEvery('BANK_DETAILS_SUBMIT', bankDetailsSubmit)
  yield takeEvery('GET_BANK_DETAILS', getBankDetails)
}
