import { takeEvery } from 'redux-saga';
import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import { read_cookie } from 'sfcookies';
import { reactLocalStorage } from 'reactjs-localstorage';
import { push } from 'react-router-redux';
import { API_URL } from '../constants';
import { SUBMIT_QUIZ, SUBMIT_QUIZ_SUCCESS} from '../constants';

// Sagas
export function* submitQuiz (action) {
  const cookeiesdata = read_cookie('cookeiesdata')
  let headersdata = {
    Authorization: cookeiesdata.userdetailsStore.header.authorization
  }
  try {
    const response = yield call(
                                  axios.put,
                                  action.submit_quiz_url,
                                  action.quizPayload,
                                  { headers: headersdata }
                              )

    console.log(response);
      //
      // yield put({ type: 'PROFILE_SUCESSS', profileData })
      // yield put(push('/HomeScreen'))
    }
   catch (error) {
    if (error.data.messageCode == 'USR404') {
      alert('user not found')
    }
    // if (storedResponse.messageCode == 'USR020') {
    //   alert('Authentication Failed')
    // } else {
    //   alert('Fail to load your data')
    // }
  }
}
export function* watchSubmitQuiz () {
  yield takeEvery(SUBMIT_QUIZ, submitQuiz)
}
