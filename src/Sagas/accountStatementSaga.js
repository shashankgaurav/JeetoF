import { takeEvery,delay} from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux'
import { put, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { reactLocalStorage } from 'reactjs-localstorage';
import { read_cookie } from 'sfcookies';
import {API_URL}  from '../constants';
import ERROR_CODE from '../errorCodes'



export function * getUserAccountStatement (accStateData) {
  let cookeiesdata = read_cookie('cookeiesdata')
console.log("saga",accStateData.accountStatementData.accountType)
    let headersdata = {
      Authorization: cookeiesdata.userdetailsStore.header.authorization
    }
    try {
      const response = yield call(
        axios.get,
        API_URL + 'v1/player/accountStatementLogs/1/type/'+accStateData.accountStatementData.accountType,
        { headers: headersdata }
      )
     
      if ( response.data.messageCode === 'ASL001') {
        let userAccData = response.data.data
        let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
        let jeetoMoneyData = {
          userdata: jeetomoneystore.jeetomoney.userdata,
          metadata: jeetomoneystore.jeetomoney.metadata,
          userBankDetails: jeetomoneystore.jeetomoney.userBankDetails,
          userAccountStatement: userAccData
        }
        reactLocalStorage.setObject('jeetomoneydataweb', {
          jeetomoney: jeetoMoneyData
        })
        // let status=true
        yield put({ type: 'ACCOUNT_DATA',userAccData})
        yield put(push('/AccountStatement'))
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
export function* watchAccountStatement() {
  yield takeEvery('GET_USER_ACCOUNT_STATEMENT', getUserAccountStatement);
}