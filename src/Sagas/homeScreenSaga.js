import { takeEvery } from 'redux-saga'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { read_cookie } from 'sfcookies'
import { reactLocalStorage } from 'reactjs-localstorage'
import { push } from 'react-router-redux'
import { API_URL } from '../constants'

// Sagas
export function * getProfileDetail ({userProfile}) {
  const cookeiesdata = read_cookie('cookeiesdata')
  let headersdata = {
    Authorization: cookeiesdata.userdetailsStore.header.authorization
  }
  try {
    const response = yield call(
      axios.get,
      API_URL + 'v1/user/' + cookeiesdata.userdetailsStore.master_players_id,
      { headers: headersdata }
    )

    const responsePerformance = yield call(
      axios.get,
      API_URL + 'v1/PlayerGameStatistics/',
      { headers: headersdata }
    )
    console.log(responsePerformance)

    if (response.data.messageCode == 'USR020') {
      let profileData = response.data.data
      let performanceData = responsePerformance.data.data
      let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
      let jeetomoney12345 = {
        userdata: profileData,
        performanceData: performanceData,
        metadata: jeetomoneystore.jeetomoney.metadata,
        total_account_balance: profileData.masterPlayerGameAccountDetails.total_account_balance
      }
      console.log("In HOME_SCREEN saga", jeetomoney12345);
      reactLocalStorage.setObject('jeetomoneydataweb', {
        jeetomoney: jeetomoney12345
      }) 
      yield put({ type: 'PROFILE_SUCESSS', profileData })
      // yield put(push('/HomeScreen'))

    }
  } catch (error) {
    // if (error.data.messageCode == 'USR404') {
    //   alert('user not found')
    // }
    // if (storedResponse.messageCode == 'USR020') {
    //   alert('Authentication Failed')
    // } else {
    //   alert('Fail to load your data')
    // }
  }
}
export function * watchRequestGetProfile () {
  yield takeEvery('HOME_SCREEN', getProfileDetail)
}
