import { takeEvery } from 'redux-saga'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { reactLocalStorage } from 'reactjs-localstorage'
import { API_URL } from '../constants'

export function * loadpaymentdata ({ payload }) {
  let data = {
    MID: 'JYCSOL64587846011809',
    CUST_ID: 'swap@gmail.com',
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail109',
    WEBSITE: 'JYCSOLWAP',
    TXN_AMOUNT: '1',
    THEME: 'merchant',
    EMAIL: 'samidhag@savvyinfocenter.com',
    MOBILE_NO: '7276396004',
    // CHECKSUMHASH: '23tIpn3e1+VI+zpQyZNBVvUUzuVhPDnh8xYxkU6AtOh7e39iy7hrxHVVd0z7wNhl627v6yhquIy5CbmTalwCEy6DLdyfqSvlDp3vkeo69k8=',
    ORDER_ID: 'TESTTnex455546753123'
  }
  let response = yield call(
    axios.post,
    'http://www.joinyourclass.com/Paytm_App_Checksum_Kit_PHP-master/generateChecksum.php',
    data
  )
  console.log(response)
  if (response.status) {
    let responsedata = response.data.CHECKSUMHASH
    let data1 = {
      MID: 'JYCSOL64587846011809',
      CUST_ID: 'swap@gmail.com',
      CHANNEL_ID: 'WEB',
      INDUSTRY_TYPE_ID: 'Retail109',
      WEBSITE: 'JYCSOLWAP',
      TXN_AMOUNT: '1',
      THEME: 'merchant',
      EMAIL: 'samidhag@savvyinfocenter.com',
      MOBILE_NO: '7276396004',
      CHECKSUMHASH: responsedata,
      ORDER_ID: 'TESTTnex455546753123',
      REQUEST_TYPE: 'DEFAULT'
    }
    let responseverify = yield call(
      axios.post,
      'http://www.joinyourclass.com/Paytm_App_Checksum_Kit_PHP-master/verifyChecksum.php',
      data1
    )
    console.log(responseverify);
    if (responseverify.status) {
      let datapaytm = {
        MID: 'JYCSOL64587846011809',
        CUST_ID: 'swap@gmail.com',
        CHANNEL_ID: 'WEB',
        INDUSTRY_TYPE_ID: 'Retail109',
        WEBSITE: 'JYCSOLWAP',
        TXN_AMOUNT: '1',
        THEME: 'merchant',
        EMAIL: 'samidhag@savvyinfocenter.com',
        MOBILE_NO: '7276396004',
        CHECKSUMHASH: responsedata,
        ORDER_ID: 'TESTTnex455546753123',
        REQUEST_TYPE: 'DEFAULT'
      }
      let responsepaytm = yield call(
        axios.post,
        'https://secure.paytm.in/oltp-web/processTransaction',
        datapaytm
      )
      console.log(responsepaytm)
    }
  }
}

export function * watchRequestPayment () {
  yield takeEvery('CALL_PAYTM', loadpaymentdata)
}
