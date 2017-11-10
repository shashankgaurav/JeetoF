import { takeEvery } from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux'
import { put, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { reactLocalStorage } from 'reactjs-localstorage';
import { read_cookie } from 'sfcookies';
import {API_URL}  from '../constants'
// reactLocalStorage.get('facebookresponse', true);
// const dataresponse = reactLocalStorage.getObject('facebookresponse');
// const cookeiesdata = read_cookie('cookeiesdata');
// Sagas
export function * loadManualLogin ({ loginData }) {
  try {
    const response = yield call(
      axios.post,
      API_URL+'v1/user/login',
      { user_email: loginData.email, password: loginData.password }
    )
    if (response.data.messageCode == 'USR020') {
      let logindata = response;
      if(logindata.data.data.is_phone_verified == true){
        yield put({ type: 'LOGIN_SUCESSS_REDIRECT', logindata, SUCCESS : 'LOGIN_REDIRECT' })
        yield put(push('/LoginScreen'))
      }else{
        yield put({ type: 'LOGIN_SUCESSS', logindata, SUCCESS : 'LOGIN' })
        yield put(push('/LoginScreen'))
      }
    }
    reactLocalStorage.setObject('loginData', response.data)
  } catch (e) {
    alert('Fail to load your data')
  }
}

export function* watchRequestManualLogin() {
    yield takeEvery('MANUAL_LOGIN_SUBMIT', loadManualLogin);
}
