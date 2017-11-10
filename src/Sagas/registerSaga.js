import { takeEvery } from 'redux-saga'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import ERROR_CODE from '../errorCodes'
import { browserHistory } from 'react-router'
import { reactLocalStorage } from 'reactjs-localstorage'
import { push } from 'react-router-redux';
import {API_URL}  from '../constants'
// 1. Worker saga

export function * registerUser (action) {
  try {
    var config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const response = yield call(
      axios.post,
      API_URL+'v1/user',
      {
        firstName: action.regData.firstName,
        lastName: action.regData.lastName,
        username: action.regData.username,
        password: action.regData.password,
        user_email: action.regData.email,
        gender: action.regData.gender
      }
    )
    if (response.data.messageCode === 'USR013') {
      console.log(response)
      // reactLocalStorage.set('registerResponse', true);
      // reactLocalStorage.setObject('registerResponse', {'Register': response.data});
      let signupdata = response
      yield put({
        type: 'REGISTER_USER_SUCCESS',
        signupdata,
        SUCCESS: 'SIGNUP'
      })
      yield put(push('/LoginScreen'))
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

// 2. watcher saga
export function * watchRegisterUser () {
  console.log('hello')
  yield takeEvery('REGISTER_USER', registerUser)
}

// Little helper function to abstract going to different pages
function forwardTo (location) {
  browserHistory.push(location)
}
