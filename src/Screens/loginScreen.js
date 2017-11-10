import React, { Component } from 'react'
import '../Stylesheets/loginScreen.css'
import PopupLayout from '../Components/popupLayout.js'
import { connect } from 'react-redux'
import { store } from '../store.js'
// import {reactLocalStorage} from 'reactjs-localstorage';
import { bindActionCreators } from 'redux'
import { switchAction, screenDisplay } from '../Actions/switchAction'
import PopupBox from '../Components/popUpBox'
import { read_cookie } from 'sfcookies'
const Router = require('react-router')
let thisnew=""
let cookeiesdata = read_cookie('cookeiesdata')
class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      screenType: 'refferalCode',
      FACEBOOK_PHONE_SCREEN: true,
      FACEBOOK_OTP_SCREEN: true,
      LOGIN_PHONE_SCREEN: true,
      LOGIN_OTP_SCREEN: true,
      SIGNUP_PHONE_SCREEN: true,
      SIGNUP_OTP_SCREEN: true,
      HOME_SCREEN: true,
      PHONE_CHANGE_REQUEST_SCREEN: true,
      show:false,
      message:''
    }
    thisnew = this;
  }
  componentWillMount () {
    if (typeof cookeiesdata.userdetailsStore !== 'undefined') {
    if(!(cookeiesdata.userdetailsStore.is_phone_verified)){
      this.setState(
        {
          screenType: 'phone',
        },function () {
          this.props.switchAction(this.state.screenType)
        })
    }else{
      this.props.switchAction(this.state.screenType)
    }
  }else{
    this.props.switchAction(this.state.screenType)    
  }
  }
  componentWillReceiveProps () {
    console.log(this.props);
    console.log(cookeiesdata);
     cookeiesdata = read_cookie('cookeiesdata')    
    if (Object.keys(cookeiesdata).length > 0) {
      console.log('in cookies');
      // if(cookeiesdata.length > 0){
      if (this.props.loginuser.length > 0) {
        console.log('in cookies loginUser');
        if (
          cookeiesdata.userdetailsStore.is_phone_verified === false &&
          this.props.verifyUser[1] === 'PHONE_UPDATED' &&
          this.state.FACEBOOK_OTP_SCREEN === true
        ) {
          console.log('in cookies OTP condition');
          this.setState(
            {
              screenType: 'otp',
              FACEBOOK_OTP_SCREEN: false
            },
            function () {
              this.props.switchAction(this.state.screenType)
            }
          )
        } else if (
          cookeiesdata.userdetailsStore.is_phone_verified === false &&
          this.props.loginuser[1] === 'LOGIN' &&
          this.state.LOGIN_PHONE_SCREEN === true
        ) {
          this.setState(
            {
              screenType: 'phone',
              LOGIN_PHONE_SCREEN: false
            },
            function () {
              this.props.switchAction(this.state.screenType)
            }
          )
        } else if (
          cookeiesdata.userdetailsStore.is_phone_verified === true &&
          (this.props.loginuser[1] === 'LOGIN_REDIRECT' ||
            this.props.loginuser[1] === 'LOGIN')
        ) {
          Router.browserHistory.push('/HomeScreen')
        }
      } else if (this.props.verifyUser.length > 0) {
        cookeiesdata = read_cookie('cookeiesdata')
         if (
          cookeiesdata.userdetailsStore.is_phone_verified === true &&
          this.props.verifyUser[1] === 'PHONE_UPDATED' &&
          this.state.FACEBOOK_OTP_SCREEN === true
        ) {
          console.log('in cookies OTP condition1')
          this.setState(
            {
              screenType: 'otp',
              FACEBOOK_OTP_SCREEN: false
            },
            function () {
              this.props.switchAction(this.state.screenType)
            }
          )
        } else if (
          cookeiesdata.userdetailsStore.is_phone_verified === false &&
          this.props.verifyUser[1] === 'PHONE_UPDATED' &&
          this.state.SIGNUP_OTP_SCREEN === true
        ) {
          console.log('in cookies OTP condition2')
          this.setState(
            {
              screenType: 'otp',
              SIGNUP_OTP_SCREEN: false
            },
            function () {
              this.props.switchAction(this.state.screenType)
            }
          )
        } else if (
          cookeiesdata.userdetailsStore.is_phone_verified === true &&
          this.props.verifyUser[2] === 'VERIFIED_OTP_CODE'
        ) {
          Router.browserHistory.push('/languageSelectionScreen')
          // if (
          //   cookeiesdata.userdetailsStore.firstUserExperience === true &&
          //   cookeiesdata.userdetailsStore.Stage === 1
          // ) {
          //   console.log(cookeiesdata)
          //   if(this.props.facebookuser.length > 0){
          //     Router.browserHistory.push('/FirstTimeUserBonusScreen')
          //   }else{
          //     Router.browserHistory.push('/AfterSignup')              
          //   }
          // } else {
          //   Router.browserHistory.push('/HomeScreen')
          // }
        }
      } else if (this.props.facebookuser.length > 0) {

        if (
          cookeiesdata.userdetailsStore.is_phone_verified === true &&
          (this.props.facebookuser[1] === 'FACEBOOK_LOGIN' ||
            this.props.facebookuser[1] === 'FACEBOOK_SIGNUP' ||
            this.props.facebookuser[1] === 'FACEBOOK_LOGIN_REDIRECT' ||
            this.props.facebookuser[1] === 'SIGNUP')
        ) {
          Router.browserHistory.push('/HomeScreen')
        } else if (
          cookeiesdata.userdetailsStore.is_phone_verified === false &&
          (this.props.facebookuser[1] === 'FACEBOOK_LOGIN' ||
            this.props.facebookuser[1] === 'FACEBOOK_SIGNUP') &&
          this.state.FACEBOOK_PHONE_SCREEN === true
        ) {
          this.setState(
            {
              screenType: 'phone',
              FACEBOOK_PHONE_SCREEN: false
            },
            function () {
              this.props.switchAction(this.state.screenType)
            }
          )
        }
      } else if (this.props.registeruser.length > 0) {
        if (
          cookeiesdata.userdetailsStore.is_phone_verified === false &&
          this.props.registeruser[1] === 'SIGNUP' &&
          this.state.SIGNUP_PHONE_SCREEN === true
        ) {
          this.setState(
            {
              screenType: 'phone',
              SIGNUP_PHONE_SCREEN: false
            },
            function () {
              this.props.switchAction(this.state.screenType)
            }
          )
        }
      }
      else if (Object.keys(this.props.phoneChangeRequest).length > 0 && this.state.PHONE_CHANGE_REQUEST_SCREEN == true)
      {
        this.setState(
          {
            screenType: 'phone',
            PHONE_CHANGE_REQUEST_SCREEN: false
          },
          function () {
            this.props.switchAction(this.state.screenType)
          })
      }
    }
  }
  // to show and hide alert popup
 addMoney = () => {
    this.setState({show:true})
  }
  renderPopup () {
    if (thisnew.state.show) {
      return (
        <PopupBox msg={this.state.message} onPress={() => thisnew.setState({ show: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  // to show and hide alert popup ends here
  render () {
  if (this.state.screenType) {
      return (
        <div className='container-fluid loginScreen'>
          {this.renderPopup()}
          <div className='middleScreen'>
            {/* <PopupLayout panelType={this.state.screenType} /> */}
            <PopupLayout />
          </div>
        </div>
      )
    }
  }
}
function mapStateToProps (state) {
  return {
    facebookuser: state.facebook,
    loginuser: state.manualLogin,
    registeruser: state.register,
    screenTypes: state.switchReducer,
    responseMeta: state.splash,
    verifyUser: state.verify,
    phoneChangeRequest: state.withdrawVerification,
    languageset: state.language
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({ switchAction }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
