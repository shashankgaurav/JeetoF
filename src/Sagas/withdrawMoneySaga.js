import { takeEvery } from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux'
import { put, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { reactLocalStorage } from 'reactjs-localstorage';
import { read_cookie } from 'sfcookies';
import {API_URL}  from '../constants';
import ERROR_CODE from '../errorCodes'

let cookeiesdata = read_cookie('cookeiesdata')

export function * withdrawMoneyRequest (withdrawMoneyRequestData) {
console.log("saga",withdrawMoneyRequestData.withdrawMoneyData.withdrawAmount)
    let headersdata = {
      Authorization: cookeiesdata.userdetailsStore.header.authorization
    }
    try {
      const response = yield call(
        axios.post,
        API_URL + '/v1/withdrawRequest',{
          withdrawal_amount: withdrawMoneyRequestData.withdrawMoneyData.withdrawAmount
        },
        { headers: headersdata }
      )
     if ( response.data.messageCode === 'WDR001') {
        let withdrawMoneyResponse = response.data.data
        let withdrawMoneyData = {
          withdrawMoneyResponse: withdrawMoneyResponse,
          Status: true
        }
        yield put({ type: 'WITHDRAW_MONEY_REQUEST_SUCCESS',withdrawMoneyData})
        yield put(push('/AccountBalance'))
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
export function* watchWithdrawMoneyRequest() {
  yield takeEvery('WITHDRAW_MONEY_REQUEST', withdrawMoneyRequest);
}