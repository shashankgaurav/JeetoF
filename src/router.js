import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { history } from './store.js'
import SplashScreen from './Screens/splashScreen'
import HomeScreen from './Screens/homeScreen'
import LoginScreen from './Screens/loginScreen'
import AccountBalanceScreen from './Screens/accountBalanceScreen.js'
import LargeBackgroundScreen from './Screens/largeBackgroundScreen'
import IntroScreen from './Screens/introScreen'
import MediaPartnerScreen from './Screens/mediaPartnerScreen.js'
import AccountBalance from './Screens/accountBalance.js'
import FirstTimeUserHomeScreen from './Screens/firstTimeUserHomeScreen.js'
import FirstTimeUserBonusScreen from './Screens/firstTimeUserBonusScreen'
import SettingsPopupLayoutScreen from './Screens/settingsPopupLayoutScreen.js'
import GameScreen from './Screens/gameScreen'
import LeaderBoardHistory from './Screens/leaderBoardHistory'
import AccountStatement from './Screens/accountStatement'
import WithdrawVerification from './Screens/withdrawVerification'
import App from './Components/App.js'
import Header from './Components/header'
import languageSelectionScreen from './Screens/languageSelectionScreen'
import RoomSelectionScreen from './Screens/RoomSelectionScreen'
import FTURefferalCode from './Screens/FTURefferalCode'
import VideoPlayerScreen from './Screens/videoPlayerScreen'
import AfterSignup from './Screens/afterSignupScreen'
import congratulation from './Screens/congratulationScreen'
import FTUPlayNow from './Screens/FTUPlayNow'
import EndOfPlay from './Screens/endOfPlay'
import EarnBonusCreditScreen from './Screens/earnBonusCreditScreen'
import InfoLinkScreen from './Screens/infoLinkScreen';


const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path='/' component={SplashScreen}>
      <IndexRoute component={SplashScreen} />
    </Route>
    <Route
      path='/SettingsPopupLayoutScreen'
      component={SettingsPopupLayoutScreen}
    />
    <Route path='/LargeBackgroundScreen' component={LargeBackgroundScreen} />
    <Route path='/IntroScreen' component={IntroScreen} />
    <Route path='/HomeScreen' component={HomeScreen} />
    <Route path='/LoginScreen' component={LoginScreen} />
    <Route path='/header' component={Header} />
    <Route path='/MediaPartnerScreen' component={MediaPartnerScreen} />
    <Route
      path='/FirstTimeUserHomeScreen'
      component={FirstTimeUserHomeScreen}
    />
    <Route
      path='/FirstTimeUserBonusScreen'
      component={FirstTimeUserBonusScreen}
    />
    {/* <Route path="/FirstTimeUserBonusScreen" component={FirstTimeUserBonusScreen} /> */}
    {
      <Route
        path='/FirstTimeUserBonusScreen'
        component={FirstTimeUserBonusScreen}
      />
    }
    <Route path='/GameScreen' component={GameScreen} />
    <Route path='/AccountBalance' component={AccountBalance} />
    <Route path='/AccountStatement' component={AccountStatement} />
    <Route path='/LeaderBoardHistory' component={LeaderBoardHistory} />
    <Route path='/RoomSelectionScreen' component={RoomSelectionScreen} />
    <Route path='/languageSelectionScreen' component={languageSelectionScreen} />
    <Route path='/WithdrawVerification' component={WithdrawVerification} />
    <Route path='/FTURefferalCode' component={FTURefferalCode} />
    <Route path='/VideoPlayerScreen' component={VideoPlayerScreen} />
    <Route path='/InfoLinkScreen' component={InfoLinkScreen} />
    <Route path='/AfterSignup' component={AfterSignup} />
    <Route path='/congratulation' component={congratulation} />
    <Route path='/FTUPlayNow' component={FTUPlayNow} />
    <Route path='/EndOfPlay' component={EndOfPlay} />
    <Route path='/EarnBonusCreditScreen' component={EarnBonusCreditScreen} />
  </Router>
)

export { router }
