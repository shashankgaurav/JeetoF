import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { watchCreateUser, createUser } from "./loginSaga";
import { watchRequest, loadfacebookDetails } from "./facebookSaga";
import { watchRequestManualLogin, loadManualLogin, verifyOtpToken} from "./manualLoginSaga";
import { watchRegisterUser, registerUser } from "./registerSaga";
import { watchRequestGetProfile, getProfileDetail} from "./homeScreenSaga";
import { watchSplash } from "./splashSaga";
import { watchMainMenuLeaderboardDetails,getMainMenuLeaderboardDetails } from "./mainMenuLeaderboardSaga";
import {watchRequestValidate} from "./validationSaga";
import { watchLeaderboard } from "./leaderboardSaga";
import { watchGetQuizRequest } from "./quizSelectionSaga";
import {watchWithdrawVerification} from "./withdrawVerificationSaga";
import {watchRequestPayment} from "./addMoneySaga";
import { watchSubmitQuiz } from './submitQuizSaga';
import {watchAccountStatement} from "./accountStatementSaga";
import {watchEmailVerify} from "./emailVerifySaga";
import {watchWithdrawMoneyRequest} from "./withdrawMoneySaga";
import {watchRequestLanguage} from './languageSaga'
import {watchAllNotifications} from './notificationSaga'

export function* sagas() {
  yield [
    // watchCreateUser() //create user saga
    watchRequest(),
    watchRegisterUser(),
    watchRequestManualLogin(),
    watchRequestGetProfile(),
    watchSplash(),
    watchMainMenuLeaderboardDetails(),
    watchRequestValidate(),
    watchLeaderboard(),
    watchGetQuizRequest(),
    watchWithdrawVerification(),
    watchRequestPayment(),
    watchSubmitQuiz (),
    watchAccountStatement(),
    watchEmailVerify(),
    watchWithdrawMoneyRequest(),
    watchRequestLanguage(),
    watchAllNotifications()
  ];
}
