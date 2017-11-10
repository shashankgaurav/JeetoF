import { takeEvery } from 'redux-saga'
import axios from 'axios'
import { put, call } from 'redux-saga/effects';
import { read_cookie } from 'sfcookies';
import { reactLocalStorage } from 'reactjs-localstorage'
import { push } from 'react-router-redux';
import {API_URL}  from '../constants';
import { GET_QUIZ, QUIZ_FETCH_SUCCESS, QUIZ_FETCH_ERROR } from '../constants';
// import  QUIZ_URL from '../API';


export function* getQuizDetails(action){
    const cookeiesdata = read_cookie('cookeiesdata');
    let headersdata = {
        'Authorization': cookeiesdata.userdetailsStore.header.authorization
    }

    let QUIZ_URL = action.quizPayload;

    try{
        const response = yield call(
          axios.get,
          QUIZ_URL,
          { headers: headersdata }
        )
        yield put({ type: QUIZ_FETCH_SUCCESS, response });

    }catch(e){

        yield put({ type: QUIZ_FETCH_ERROR, e });

    }
}

export function * watchGetQuizRequest() {
  console.log(5)
  yield takeEvery(GET_QUIZ, getQuizDetails)
}
