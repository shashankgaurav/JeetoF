import { takeEvery } from 'redux-saga'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import PopupLayout from '../Components/popupLayout.js'
import { reactLocalStorage } from 'reactjs-localstorage'
import { API_URL } from '../constants'
import { read_cookie } from 'sfcookies'

// Sagas
export function * loadfacebookDetails ({ payload }) {
  try {
    console.log("hjsdgjdgsjdf");
    let cookeiesdata = read_cookie('cookeiesdata')
    console.log(cookeiesdata);
    if (cookeiesdata.userdetailsStore.is_user_logged_in) {
      console.log("in of condition")
      try {
        const response = yield call(axios.post, API_URL + 'v1/user/login', {
          facebookID: payload.facebookID
        })
        let payloadresponse = response
        if (response.data.messageCode === 'USR020') {
          // reactLocalStorage.set('facebookresponse', true);
          // reactLocalStorage.setObject('facebookresponse', {'facebooklogin': payloadresponse.data});
          if (payloadresponse.data.is_phone_verified) {
            yield put({
              type: 'FACEBOOK_SUCCESS_REDIRECT',
              payloadresponse,
              SUCCESS: 'FACEBOOK_LOGIN_REDIRECT'
            })
            yield put(push('/LoginScreen'))
          } else if (cookeiesdata.userdetailsStore.firstUserExperience){
            yield put(push('/FirstTimeUserBonusScreen'))
          } else {
            if (payloadresponse.data.is_phone_verified) {
              yield put({
                type: 'FACEBOOK_SUCCESS_REDIRECT',
                payloadresponse,
                SUCCESS: 'FACEBOOK_LOGIN_REDIRECT'
              })
              yield put(push('/LoginScreen'))
            } else {
              yield put({
                type: 'FACEBOOK_SUCCESS',
                payloadresponse,
                SUCCESS: 'FACEBOOK_LOGIN'
              })
            }
            yield put(push('/HomeScreen'))
          }
        }
      } catch (error) {
        // if(response.data.messageCode === 'USR404')
        let headersdata = {
          Authorization: cookeiesdata.userdetailsStore.header.authorization
        }
        const response = yield call(
          axios.put,
          API_URL + 'v1/user/' + cookeiesdata.userdetailsStore.master_players_id,
          payload,
          { headers: headersdata }
        )
        let payloadresponse = response
        if (response.data.messageCode === 'USR015') {
          // reactLocalStorage.set('facebookresponse', true);
          // reactLocalStorage.setObject('facebookresponse', {'facebooklogin': payloadresponse.data});
          yield put({
            type: 'FACEBOOK_SUCCESS_AFTER_LOGIN',
            payloadresponse,
            SUCCESS: 'FACEBOOK_SIGNUP_AFTER_LOGIN'
          })
          yield put(push('/LoginScreen'))
        }
      }
    } 
  } catch (error) {
          console.log("catch")
    try{
      const response = yield call(axios.post, API_URL + 'v1/user', payload)
      let payloadresponse = response
      if (response.data.messageCode === 'USR013') {
        // reactLocalStorage.set('facebookresponse', true);
        // reactLocalStorage.setObject('facebookresponse', {'facebooklogin': payloadresponse.data});
        yield put({
          type: 'FACEBOOK_SUCCESS',
          payloadresponse,
          SUCCESS: 'FACEBOOK_SIGNUP'
        })
        yield put(push('/LoginScreen'))
      }
    } catch (error) {
    if (error.response) {
      if (error.response.data.messageCode == 'USR008') {
        try {
          const response = yield call(axios.post, API_URL + 'v1/user/login', {
            facebookID: payload.facebookID
          })
          let payloadresponse = response
          if (response.data.messageCode === 'USR020') {
            // reactLocalStorage.set('facebookresponse', true);
            // reactLocalStorage.setObject('facebookresponse', {'facebooklogin': payloadresponse.data});
            if (payloadresponse.data.is_phone_verified) {
              yield put({
                type: 'FACEBOOK_SUCCESS_REDIRECT',
                payloadresponse,
                SUCCESS: 'FACEBOOK_LOGIN_REDIRECT'
              })
              yield put(push('/LoginScreen'))
            } else {
              yield put({
                type: 'FACEBOOK_SUCCESS',
                payloadresponse,
                SUCCESS: 'FACEBOOK_LOGIN'
              })
              yield put(push('/LoginScreen'))
            }
          }
        } catch (error) {}
      } else if (error.response.data.messageCode == 'USR017') {
        alert(
          'Email id already register with ' +
            error.response.data.addition +
            ' login with same'
        )
      } else {
        alert('connection time out')
      }
    }
  }
}
}

export function * watchRequest () {
  yield takeEvery('GET_FACEBOOK_REQUEST', loadfacebookDetails)
}
