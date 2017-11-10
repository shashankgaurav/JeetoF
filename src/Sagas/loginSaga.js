import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {put, call} from 'redux-saga/effects';
//1. Worker saga
export function* createUser(action){
  try{
    console.log('new api call');
    const response = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts', {type: action})
    console.log(response);
  } catch(e){
    console.log(e);
  }
}

//2. watcher saga
export function* watchCreateUser() {
  console.log("hello");
  yield takeEvery('ADD_USER', createUser);
}
