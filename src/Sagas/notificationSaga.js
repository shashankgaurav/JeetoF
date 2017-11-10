import { takeEvery, delay } from 'redux-saga'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { API_URL } from '../constants'
import { reactLocalStorage } from 'reactjs-localstorage'
import { read_cookie } from 'sfcookies';


// 1. Worker saga
export function * getAllNotifications (action) {
  console.log("notification saga")

  const cookeiesdata = read_cookie('cookeiesdata');
  // console.log(cookeiesdata.userdetailsStore.header);
  let headersdata = {
    'Authorization': cookeiesdata.userdetailsStore.header.authorization
  }

  try {
    const notificatioAPIDetails = yield call(axios.get, API_URL + 'v1/notifications/1', {headers: headersdata})
    let notificationDetails = notificatioAPIDetails.data.data;
      yield put({ type: 'SET_ALL_NOTIFICATIONS', notificationDetails })      
      yield call(delay, 5000)
  } catch (e) {
    console.log(e)
  }
}

// 2. watcher saga
export function * watchAllNotifications () {
  yield takeEvery('DISPLAY_ALL_NOTIFICATIONS', getAllNotifications)
}
