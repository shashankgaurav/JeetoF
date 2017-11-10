import { takeEvery } from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux'
import { put, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { reactLocalStorage } from 'reactjs-localstorage';
import { read_cookie } from 'sfcookies';
import {API_URL}  from '../constants';

export function * sendToNextscreen ({ screenPanel }) {

}
export function* watchRequestSwitch() {
  console.log(5);
  yield takeEvery('SWITCH_SCREEN', sendToNextscreen);
}