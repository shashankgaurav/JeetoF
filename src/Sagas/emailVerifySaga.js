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

export function * emailVerifySubmit (emailVerifyData) {
console.log("saga",emailVerifyData)
    let headersdata = {
      Authorization: cookeiesdata.userdetailsStore.header.authorization
    }
    try {
      const response = yield call(
        axios.put,
        API_URL+'v1/user/'+cookeiesdata.userdetailsStore.master_players_id,
        {
          user_email: emailVerifyData.emailChangeData.email
        },
        { headers: headersdata }
      )
     
      if ( response.data.messageCode === 'USR020') {
        let userData = response.data.data
        let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb');
        let jeetoMoneyData = {metadata: jeetomoneystore.jeetomoney.metadata,
          userBankDetails: jeetomoneystore.jeetomoney.userBankDetails,
          userdata: userData
        }
        reactLocalStorage.setObject('jeetomoneydataweb', {
          jeetomoney: jeetoMoneyData
        })
        let Success=true
        yield put({type: 'EMAIL_VERIFY_SUCCESS',Success})
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
export function* watchEmailVerify() {
  yield takeEvery('EMAIL_CHANGE_SUBMIT',emailVerifySubmit);
}