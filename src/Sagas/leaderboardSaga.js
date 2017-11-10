import { takeEvery, delay } from 'redux-saga'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { API_URL } from '../constants'
import { reactLocalStorage } from 'reactjs-localstorage'
import { read_cookie } from 'sfcookies';


// 1. Worker saga
export function * getLeaderboardDataCall (action) {
  console.log("leaderboard saga")

  const cookeiesdata = read_cookie('cookeiesdata');
  // console.log(cookeiesdata.userdetailsStore.header);
  let headersdata = {
    'Authorization': cookeiesdata.userdetailsStore.header.authorization
  }

  try {
    console.log(API_URL);
    const responseLeaderboardData = yield call(axios.get, API_URL + 'v1/leaderBoard/1', {headers: headersdata})
    let leaderboardDetails = responseLeaderboardData.data.data;

    let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
    let jeetoMoneyData = {
      userdata: jeetomoneystore.jeetomoney.userdata,
      metadata: jeetomoneystore.jeetomoney.metadata,
      leaderboardAPIResponse: leaderboardDetails
    }
    reactLocalStorage.setObject('jeetomoneydataweb', {
      jeetomoney: jeetoMoneyData
    })

      // console.log("in leaderbaord saga");
      // console.log(leaderboardDetails); 
      // reactLocalStorage.setObject('jeetomoneydataweb', {
      //   leaderboardDetails: leaderboardDetails
      // })
      yield put({ type: 'SET_LEADERBOARD_SCREEN_DETAILS', leaderboardDetails })      
      yield call(delay, 5000)
  } catch (e) {
    console.log(e)
  }
}

// 2. watcher saga
export function * watchLeaderboard () {
  yield takeEvery('LEADERBOARD_SCREEN', getLeaderboardDataCall)
}
