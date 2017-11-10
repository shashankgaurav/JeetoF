import { takeEvery, delay } from 'redux-saga'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { API_URL } from '../constants'
import { reactLocalStorage } from 'reactjs-localstorage'

// 1. Worker saga
export function * splashCall (action) {
  try {
    const responseMetaData = yield call(axios.get, API_URL + 'v1/metadata')
    // if (responseMetaData.data.messageCode === 'MET001') {
      let jeetomoney = {
        userdata: {
          firstName: '',
          lastName: '',
          profile_picture_url: '',
          masterPlayerGameAccountDetails: []
        },
        metadata: responseMetaData.data.data,
        userAccountStatement:[]
      }
      reactLocalStorage.setObject('jeetomoneydataweb', {
        jeetomoney: jeetomoney
      })
      yield call(delay, 5000)
      yield put({ type: 'SPLASH_SCREEN_SET', responseMetaData })
    // }
  } catch (e) {
    console.log(e)
  }
}

// 2. watcher saga
export function * watchSplash () {
  yield takeEvery('SPLASH_SCREEN', splashCall)
}
