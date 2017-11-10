import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {put, call} from 'redux-saga/effects';
import ERROR_CODE from '../errorCodes';
import {browserHistory} from 'react-router';
import {reactLocalStorage} from 'reactjs-localstorage';
import { push } from 'react-router-redux';
import {API_URL}  from '../constants';
//1. Worker saga

export function* getMainMenuLeaderboardDetails(action){
  console.log(action);
  try{
    const response = yield call(axios.get, API_URL+'v1/metadata')
    
    console.log(response);     
    // if(response.data.messageCode == 'USR013'){
    //   console.log(response); 
    //   // reactLocalStorage.set('mainMenuLeaderboardResponse', true);
    //  reactLocalStorage.setObject('mainMenuLeaderboardResponse', {'mainMenuLeaderboard': response.data});
     yield put({type: "MAIN_MENU_LEADERBOARD_DETAILS_SUCCESS", response})  
    //   // yield put(push('/'));
    // }
      
    } catch(error){
      if(error.response) { 
        let error_code = error.response.data.messageCode;
        error=ERROR_CODE[error_code];
        // console.log(error); 
        yield put({ type: "FETCH_ERROR",error});
        
      } 
    }
  }

//2. watcher saga
export function* watchMainMenuLeaderboardDetails() {
  yield takeEvery('MAIN_MENU_LEADERBOARD_DETAILS',getMainMenuLeaderboardDetails);
}

// Little helper function to abstract going to different pages
function forwardTo (location) {
  browserHistory.push(location)
}

