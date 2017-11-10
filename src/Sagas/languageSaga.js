import { takeEvery } from 'redux-saga'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { reactLocalStorage } from 'reactjs-localstorage'
import { API_URL } from '../constants'
import { read_cookie } from 'sfcookies'

export function * updatelanguagedata ({ language }) {
  let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')  
  const cookeiesdata = read_cookie('cookeiesdata')
  console.log(cookeiesdata);
  let headersdata = {
    Authorization: cookeiesdata.userdetailsStore.header.authorization
  }
  try {
    const responselanguage = yield call(
      axios.put,
      API_URL + 'v1/user/' + cookeiesdata.userdetailsStore.master_players_id,
      { ref_languages_id: language },
      { headers: headersdata }
    )
    let profileData = responselanguage.data.data
    if (responselanguage.data.messageCode === 'USR020') {
      console.log()
      let jeetomoney12345 = {
        userdata: profileData,
        metadata: jeetomoneystore.jeetomoney.metadata
      }
      reactLocalStorage.setObject('jeetomoneydataweb', {
        jeetomoney: jeetomoney12345
      })
      if (cookeiesdata.userdetailsStore.register === 'facebook') {
        yield put(push('/FirstTimeUserBonusScreen'))
      } else {
        yield put(push('/AfterSignup'))
      }
    }
  } catch (error) {
    if (error.response.data.messageCode == 'USR028') {
      alert('moobile number already varified')
    }
  }
}

export function * watchRequestLanguage () {
  yield takeEvery('LANGUAGE_UPDATE', updatelanguagedata)
}
