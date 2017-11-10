import { takeEvery } from 'redux-saga'
import axios from 'axios'
import { push } from 'react-router-redux'
import { put, call } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { reactLocalStorage } from 'reactjs-localstorage'
import { read_cookie } from 'sfcookies'
import {API_URL} from '../constants'
import ERROR_CODE from '../errorCodes'
// reactLocalStorage.get('facebookresponse', true);
// const dataresponse = reactLocalStorage.getObject('facebookresponse');
export function * updatePhoneNumber ({ phoneNumber }) {
  const cookeiesdata = read_cookie('cookeiesdata')
  let url =
    API_URL +
    'v1/user/mobile/' +
    cookeiesdata.userdetailsStore.master_players_id
  let headersdata = {
    Authorization: cookeiesdata.userdetailsStore.header.authorization
  }
  try {
    console.log(url)
    const response = yield call(axios.put, url, {
      phone_number_10_digits: phoneNumber.phone,
      phone_number_country_code: '+91'
    },{headers: headersdata}
  )
    let userResponse = response.data
    if (response.data.messageCode == 'USR015') {
      console.log('gzhjzghxzjcgzxjcgzxc')
      try {
        const responseOtp = yield call(
          axios.post,
          API_URL +
            'v1/user/otp/' +
            cookeiesdata.userdetailsStore.master_players_id,'',{headers: headersdata}
        )
        console.log(responseOtp.data.messageCode)
        if (
          responseOtp.data.messageCode == 'USR029' ||
          responseOtp.data.messageCode == 'USR025'
        ) {
          yield put({
            type: 'UPDATE_SUCCESS',
            userResponse,
            SUCCESS: 'PHONE_UPDATED'
          })
          yield put(push('/LoginScreen'))
        }
      } catch (error) {
        if (error.response.data.messageCode === 'USR028') {
          let ErrorCode = error.response.data.messageCode
            error = ERROR_CODE[ErrorCode]
          // console.log(error);
          yield put({ type: 'FETCH_ERROR', error })
        } else if (error.response.data.messageCode === 'USR023') {
          let ErrorCode = error.response.data.messageCode
          error = ERROR_CODE[ErrorCode]
          // console.log(error);
          yield put({ type: 'FETCH_ERROR', error })
        }
      }
    }
  } catch (error) {
    if (error.response.data.messageCode === 'USR028') {
      let ErrorCode = error.response.data.messageCode
        error = ERROR_CODE[ErrorCode]
      // console.log(error);
      yield put({ type: 'FETCH_ERROR', error })
    } else if (error.response.data.messageCode === 'USR023') {
      let ErrorCode = error.response.data.messageCode
      error = ERROR_CODE[ErrorCode]
      // console.log(error);
      yield put({ type: 'FETCH_ERROR', error })
    }
    else if (error.response.data.messageCode == 'USR018') {
      let ErrorCode = error.response.data.messageCode
      error = ERROR_CODE[ErrorCode]
      // console.log(error);
      yield put({ type: 'FETCH_ERROR', error })
    }
  }
}

export function * verifyOtpToken ({ otpdata }) {
  const cookeiesdata123 = read_cookie('cookeiesdata')
  console.log(cookeiesdata123)
  console.log(cookeiesdata123.userdetailsStore.master_players_id)
  let headersdata = {
    'Authorization': cookeiesdata123.userdetailsStore.header.authorization
}
  try {
    const response = yield call(
      axios.put,
      API_URL +
        'v1/user/otp/' +
        cookeiesdata123.userdetailsStore.master_players_id,
      { otp: otpdata.otpval }
    )

    if (response.data.messageCode == 'USR027') {
      if(cookeiesdata123.userdetailsStore.phoneChangeRequest==true)
      {
        try {
          const responsePhoneChange = yield call(
            axios.get,
            API_URL+'v1/user/' +
              cookeiesdata123.userdetailsStore.master_players_id,
              {headers: headersdata},
          )
          if (responsePhoneChange.data.messageCode == 'USR020') {
             let profileData = responsePhoneChange.data.data
            let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb');
           let jeetomoney12345 = {userdata: profileData,
                              metadata: jeetomoneystore.jeetomoney.metadata};
            reactLocalStorage.setObject('jeetomoneydataweb', {'jeetomoney': jeetomoney12345});
          yield put({ type: 'PHONE_CHANGE_REQUEST_SUCCESS', SUCCESS: 'PHONE_CHANGE_SUCCESS' })
          yield put(push('/WithdrawVerification'))

        }
      }catch (error) {
          if (error.response.data.messageCode == 'USR026') {
            alert('Wrong Otp')
          }
        }  
      }
      else{
      //   reactLocalStorage.set('facebookresponse', true);
      //   reactLocalStorage.setObject('facebookresponse', {'facebooklogin': userResponse.data});
      yield put({ type: 'OTP_SUCCESS', SUCCESS: 'VERIFIED_OTP_CODE' })
      yield put(push('/LoginScreen'))
      }
    }
  } catch (error) {
    if (error.response.data.messageCode == 'USR026') {
      let ErrorCode = error.response.data.messageCode
      error = ERROR_CODE[ErrorCode]
      // console.log(error);
      yield put({ type: 'FETCH_ERROR', error })
    }
  }
}
export function * watchRequestValidate () {
  yield takeEvery('PHONE_NUMBER_SUBMIT', updatePhoneNumber)
  yield takeEvery('VERIFY_OTP', verifyOtpToken)
}
