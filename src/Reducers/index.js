import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { facebookReducer } from './facebookScreenReducer';
import { manualLoginReducer } from './manualLoginReducer';
import { splashReducer } from './splashReducer';
import { switchReducer } from './switchReducer';
import { registerReducer} from './registerReducer.js';
import { homeScreenReducer } from './homeScreenReducer';
import {varificationReducer,varificationErrorReducer} from './varificationReducer';
import { buttonSelectReducer, roomSelectReducer, cardSelectReducer} from './buttonSelectReducer';
import { payTableReducer } from './payTableReducer';
import { leaderboardReducer } from './leaderboardReducer';
import { getQuizReducer, setQuizReducer } from './getQuizDetailsReducer';
import { withdrawVarificationReducer } from './withdrawVerificationReducer';
import { submitQuizReducer } from './submitQuizReducer';
import { addMoneyReducer } from './addMoneyReducer'
import { userAccountStatementReducer } from './accountStatementReducer'
import { emailVerifyReducer } from './emailVeriFyReducer'
import { withdrawMoneyReducer } from './withdrawMoneyReducer'
import { languageReducer } from './languageReducer'
import { notificationReducer } from './notificationReducer'

export const reducers = combineReducers({
  routing: routerReducer,
  facebook: facebookReducer,
  register: registerReducer,
  manualLogin: manualLoginReducer,
  splash: splashReducer,
  switchReducer,
  verify: varificationReducer,
  button: buttonSelectReducer,
  room: roomSelectReducer,
  cardData: cardSelectReducer,
  payTable: payTableReducer,
  homeScreen: homeScreenReducer,
  leaderboard: leaderboardReducer,
  quizFetch: getQuizReducer,
  quiz: setQuizReducer,
  withdrawVerification: withdrawVarificationReducer,
  addMoney: addMoneyReducer,
  submitQuiz: submitQuizReducer,
  userAccountStatement: userAccountStatementReducer,
  emailVerify: emailVerifyReducer,
  withdrawMoney: withdrawMoneyReducer,
  language : languageReducer,
  notification:notificationReducer,
  errorhandel: varificationErrorReducer
})
