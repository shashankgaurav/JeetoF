import React, { Component } from 'react'
import '../Stylesheets/popupLayout.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerData } from '../Actions/registerAction'
// import TabContainer from "../../tabContainer/tabContainer.js";
import PopupLayoutLogo from './popupLayoutLogo.js'
import SubmitButton from './answerButton.js'
import Captcha from './capacha.js'
import Facebookbutton from './facebookButton.js'
import profileIcon from '../Images/profile_icon.png'
import facebookIcon from '../Images/fb.png'
import { submitLoginForm } from '../Actions/manualLoginAction'
import {
  submitPhoneForm,
  submitOtpForm,
  submitPhoneRequestForm
} from '../Actions/varificationAction'
import { reactLocalStorage } from 'reactjs-localstorage'
import Spinner from './spinner'
import { push } from 'react-router-redux'
import closeicon from '../Images/closeicon.png'
// import PayTablePopup from '../Components/popUpBox.js'
// import PopUpBox from './popUpBox.js'
import PopUpBox from './popUpBox.js'
import { switchAction, switchScreen } from '../Actions/switchAction'
import { read_cookie } from 'sfcookies'
let thisRef = ''
reactLocalStorage.get('facebookresponse', true)
const dataresponse = reactLocalStorage.getObject('facebookresponse')
class popupLayout extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    // alert(reactLocalStorage.getObject('facebookresponse').facebooklogin.master_players_id);
    thisRef.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      error: '',
      users: '',
      show: false,
      referral_code: 'signUp',
      phone: '',
      otpval: '',
      msg: '',
      showAlert: true
      // master_players_id: dataresponse.facebooklogin.master_players_id
    }

    this.pannelSizeClass = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    thisRef.handleSignUpChange = thisRef.handleSignUpChange.bind(this)
    thisRef.handleSignUpSubmit = thisRef.handleSignUpSubmit.bind(this)
  }

  renderPanelConditionaly () {
    // switch (this.props.panelType) {
    switch (this.props.screenTypes[0]) {
      case 'login':
        return thisRef.renderLogin(thisRef.facebookButton)
      case 'signUp':
        return thisRef.renderSignup(thisRef.facebookButton)
      case 'refferalCode':
        return thisRef.renderReferralCode(thisRef.facebookButton)
      case 'otp':
        return thisRef.renderOtp(thisRef.facebookButton)
      case 'phone':
        return thisRef.renderVerificationPanel(thisRef.facebookButton)
    }
  }
  componentWillReceiveProps () {
    console.log("fdsfsdfsd",this.props);
    if (this.props.registeruser.length > 0) {
      thisRef.setState({ msg: this.props.registeruser[0], show: true })
    }else if(this.props.errorhandel.length > 0){
      thisRef.setState({ msg: this.props.errorhandel[0], show: true })
    }
  }
  validateUsername (field) {
    // const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,10}$/
    // return pattern.test(field)
    return true
  }
  validatePassword (field) {
    const passWordpattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    return passWordpattern.test(field)
  }
  validateEmail (field) {
    const reemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reemail.test(field)
  }
  validateName (field) {
    const rename = /^[A-Za-z\d\s]+$/
    return rename.test(field)
  }
  validateConfirmPassword (password, confirmPassword) {
    if (password === confirmPassword) {
      return true
    } else {
      return false
    }
  }
  handleSubmit (event) {
    this.setState({ spinner: true })
    this.renderSpinner()
    event.preventDefault()

    if (thisRef.state.email.length > 0 && thisRef.state.password.length > 0) {
      if (!thisRef.validateUsername(thisRef.state.email)) {
        alert('Please enter valid email')
      } else if (!thisRef.validatePassword(thisRef.state.password)) {
        alert('Please enter valid password')
      } else {
        thisRef.props.submitLoginForm(thisRef.state)
      }
    } else {
      alert('Fields Could not be empty')
    }
  }
  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  renderSpinner () {
    if (thisRef.state.spinner) {
      return <Spinner />
    }
  }
  handleSignUpChange (event) {
    console.log(thisRef.state)
    thisRef.setState({ [event.target.name]: event.target.value })
  }
  handleSignUpSubmit (event) {
    event.preventDefault()
    if (
      thisRef.state.email.length > 0 &&
      thisRef.state.password.length > 0 &&
      thisRef.state.confirmPassword.length > 0 &&
      thisRef.state.firstName.length > 0 &&
      thisRef.state.lastName.length > 0 &&
      thisRef.state.username.length > 0
    ) {
      if (!thisRef.validateEmail(thisRef.state.email)) {
        thisRef.setState({ msg: 'Please enter valid Email', show: true })
      } else if (!thisRef.validatePassword(thisRef.state.password)) {
        thisRef.setState({ msg: 'Please enter valid Password', show: true })
      } else if (
        !thisRef.validateConfirmPassword(
          thisRef.state.password,
          thisRef.state.confirmPassword
        )
      ) {
        thisRef.setState({
          msg: 'Password is not equal to confirm password',
          show: true
        })
      } else if (!thisRef.validateName(thisRef.state.firstName)) {
        thisRef.setState({ msg: 'Please enter valid first name', show: true })
      } else if (!thisRef.validateName(thisRef.state.lastName)) {
        thisRef.setState({ msg: 'Please enter valid last name', show: true })
      } else if (!thisRef.validateUsername(thisRef.state.username)) {
        thisRef.setState({ msg: 'Please enter valid Username', show: true })
      } else {
        thisRef.props.registerData(thisRef.state)
      }
    } else {
      thisRef.setState({ msg: 'Please fill all field', show: true })
    }
  }
  handlerefferalCode (event) {
    thisRef.setState({ [event.target.name]: event.target.value })
    // console.log(thisRef.state.referral_code);
    return <SubmitButton name={thisRef.facebookButton} type={'submit'} />
  }
  handlePhoneChange (event) {
    thisRef.setState({ [event.target.name]: event.target.value })
  }
  handlePhoneSubmit (event) {
    event.preventDefault()
    // if(Object.keys(thisRef.props.phoneChangeRequest).length > 0 )
    // {
    //   thisRef.props.submitPhoneRequestForm(thisRef.state)
    // }
    // else
    // {
    thisRef.props.submitPhoneForm(thisRef.state)
    // }
  }
  handleOtpChange (event) {
    thisRef.setState({ [event.target.name]: event.target.value })
  }
  handleOtpSubmit (event) {
    event.preventDefault()
    thisRef.props.submitOtpForm(thisRef.state)
  }
  handleredirectlogin = event => {
    event.preventDefault()
    // this.props.switchScreen('login');
    this.props.switchAction('login')
  }
  handleredirectSignup = event => {
    event.preventDefault()
    // this.props.switchScreen('signUp');
    this.props.switchAction('signUp')
  }

  renderLogin (facebookButton) {
    return (
      <div className='loginPanel'>
        <div className='popupHeaderPanel '>
          <PopupLayoutLogo />
        </div>

        <div className='formPanel'>
          <form onSubmit={this.handleSubmit}>
            <div className='row panelInput'>
              <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                <div className='form-group'>
                  <label for='exampleFormControlInput1' className='inputLabel'>
                    Email
                  </label>

                </div>
              </div>
              <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='exampleFormControlInput1'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className='row panelInput'>
              <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                <div className='form-group'>
                  <label for='exampleFormControlInput1' className='inputLabel'>
                    Password
                  </label>

                </div>
              </div>
              <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleFormControlInput1'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className='row panelInput'>
              <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3' />
              <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                <Captcha />
              </div>
            </div>
            <div className='row panelInput'>
              <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3' />
              <div className='col-md-9 col-sm-9 col-xs-9 col-lg-9'>
                <div className='loginButton'>
                  <SubmitButton name={'Login'} type={'submit'} />
                </div>
                <div className='loginButton'>
                  <SubmitButton name={'SignUp'} />
                </div>
              </div>
            </div>
            <div className='row panelInput'>
              <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3' />
              <div className='col-md-offset-4 col-sm-offset-4 col-xs-offset-4 col-lg-offset-4 col-md-9 col-sm-9 col-xs-9 col-lg-9'>
                <a href='#' className='forgotPassword'>Forgot Password ?</a>
              </div>
            </div>
          </form>
        </div>

        <div className='divider' />
        <div className='socialLoginText'>
          <div className='socialText'>
            Login with Facebook and get bonus credit of ₹ 20
          </div>
          <div className='socialImage'>

            <SubmitButton name={facebookButton} type={'submit'} />
          </div>
        </div>

      </div>
    )
  }
  renderPopup () {
    if (thisRef.state.show) {
      return (
        <PopUpBox
          message={this.state.msg}
          onPress={() => thisRef.setState({ show: false })}
          alertType={'alertType'}
        />
      )
    } else {
      ;<span />
    }
  }
  renderSignup (facebookButton) {
    return (
      <div className='signupPanel'>
        <div className='signupHeader' />
        <div className='popupHeaderPanel '>
          <div className='col-xs-2 col-sm-2 col-md-2  col-lg-2'>
            <div className='imagePickerPanel'>
              <div className='innerPanel'>
                <div className='imagePicker'>
                  <img src={profileIcon} className='profileImageSignUp' />
                  <div className='folderIcon' />
                </div>
              </div>
            </div>
          </div>
          <div className='col-xs-10 col-sm-10 col-md-10 col-lg-10'>
            <PopupLayoutLogo />
          </div>
        </div>
        <div className='formContainer'>
          <form onSubmit={this.handleSignUpSubmit}>
            <div className='row signUpFormRow'>
              <div className='col-xs-6 col-md-6 col-sm-6 col-lg-6'>
                <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                  <div className='form-group'>
                    <label
                      for='exampleFormControlInput1'
                      className='inputLabel'
                    >
                      First Name
                    </label>

                  </div>
                </div>
                <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='firstName'
                      className='form-control'
                      value={this.state.firstName}
                      onChange={this.handleSignUpChange}
                    />
                  </div>
                </div>
              </div>
              <div className='col-xs-6 col-md-6 col-sm-6 col-lg-6'>
                <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                  <div className='form-group'>
                    <label
                      for='exampleFormControlInput1'
                      className='inputLabel'
                    >
                      Last Name
                    </label>

                  </div>
                </div>
                <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='lastName'
                      className='form-control'
                      value={this.state.lastName}
                      onChange={this.handleSignUpChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row signUpFormRow'>
              <div className='col-xs-6 col-md-6 col-sm-6 col-lg-6'>
                <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                  <div className='form-group'>
                    <label
                      for='exampleFormControlInput1'
                      className='inputLabel'
                    >
                      Display Name
                    </label>

                  </div>
                </div>
                <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='username'
                      className='form-control'
                      value={this.state.username}
                      onChange={this.handleSignUpChange}
                    />
                  </div>
                </div>
              </div>
              <div className='col-xs-6 col-md-6 col-sm-6 col-lg-6'>
                <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                  <div className='form-group'>
                    <label
                      for='exampleFormControlInput1'
                      className='inputLabel'
                    >
                      Email
                    </label>

                  </div>
                </div>
                <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                  <div className='form-group'>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      value={this.state.email}
                      onChange={this.handleSignUpChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row signUpFormRow'>
              <div className='col-xs-6 col-md-6 col-sm-6 col-lg-6'>
                <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                  <div className='form-group'>
                    <label
                      for='exampleFormControlInput1'
                      className='inputLabel'
                    >
                      Password
                    </label>

                  </div>
                </div>
                <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                  <div className='form-group'>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      value={this.state.password}
                      onChange={this.handleSignUpChange}
                    />
                  </div>
                </div>
              </div>
              <div className='col-xs-6 col-md-6 col-sm-6 col-lg-6'>
                <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                  <div className='form-group'>
                    <label
                      for='exampleFormControlInput1'
                      className='inputLabel'
                    >
                      Confirm Password
                    </label>

                  </div>
                </div>
                <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                  <div className='form-group'>
                    <input
                      type='password'
                      name='confirmPassword'
                      className='form-control'
                      value={this.state.confirmPassword}
                      onChange={this.handleSignUpChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row signUpFormRow'>
              <div className='col-xs-3 col-sm-3 col-md-3  col-lg-3'>
                <Captcha />
              </div>
              <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9 signUpButtonPanel'>
                <div className='signupSubmit'>
                  <SubmitButton name={'Submit'} type={'submit'} />
                </div>
                <div className='signupLogin'>
                  <SubmitButton name={'Login'}  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className='divider' />
        <div className='socialLoginText'>
          <div className='socialTextSignUp'>
            Login with Facebook and get bonus credit of ₹ 20
          </div>
          <div className='socialImage'>
            <SubmitButton name={facebookButton} type={'submit'} />
          </div>
        </div>

      </div>
    )
  }
  renderReferralCode (facebookButton) {
    return (
      <div className='referelCode '>
        <div className='popupHeaderPanel '>
          <PopupLayoutLogo />
          <div className='socialLogin'>
            <div className='socialLoginText'>
              <div className='socialText'>
                Login with Facebook and get bonus credit of Rs.20
              </div>
              <div className='referelCodetextBox'>
                <div className='form-group'>
                  <label for='exampleFormControlInput1'>Referral Code</label>
                  <input
                    type='password'
                    name='referral_code'
                    className='form-control'
                    id='exampleFormControlInput1'
                    onChange={this.handlerefferalCode}
                  />
                </div>
              </div>
            </div>
            <div className='socialImage'>
              <SubmitButton name={facebookButton} />
            </div>
            <div className='divider' />
            <div className='row actionButtons'>
              <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3' />
              <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                <div
                  className='signUpButtonReferral'
                  onClick={this.handleredirectSignup}
                >
                  <SubmitButton name={'SIGNUP'} />
                </div>
              </div>
              <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                <div
                  className='loginButtonRefferal'
                  onClick={this.handleredirectlogin}
                >
                  <SubmitButton name={'LOGIN'} />
                </div>
              </div>
              <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3' />
            </div>
            <div className='termsAndConditionPopup'>
              By signing up, you agree to JETOMONEY's
              {' '}
              <a href='https://s3.ap-south-1.amazonaws.com/jeetomoneyuserdata/policy/termsandconditions.html'>Terms and Condition </a>
              {' '}
              and
              {' '}
              <a href='https://s3.ap-south-1.amazonaws.com/jeetomoneyuserdata/policy/Privacy_Policy.html'>Privacy Policy</a>
              . Residents of the states of Assam, Odisha and Telangana, and where otherwise prohibited by law are not eligible to enter JEETOMONEY's paid leagues.
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderVerificationPanel () {
    return (
      <div className='mobileNumberVerification'>
        {/* {this.renderSpinner()} */}
        <div className='popupHeaderPanel '>
          <PopupLayoutLogo />
        </div>
        <div className='formPanelIndiVisual'>
           <div className="otpVerification">
            Verify mobile number
          </div>
          <form onSubmit={this.handlePhoneSubmit}>
            <div className=''>

              <div className='form-group'>
                <input
                  type='text'
                  name='phone'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Verify mobile number'
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                />
                <div className='mobileVerificationText'>
                  Please enter 10 digit mobile number and OTP will sent to this number for verification
                </div>
              </div>
            </div>

            <div className='submitButtonVerification'>
              <SubmitButton name={'submit'} type='submit' />
            </div>
          </form>

        </div>
      </div>
    )
  }
  renderOtp () {
    // thisRef.props.generateOTP(dataresponse);
    return (
      <div className='otp'>
        <div className='popupHeaderPanel '>
          <PopupLayoutLogo />
        </div>
        <div className='formPanelIndiVisual'>
          <div className="otpVerification">
            OTP Verification
          </div>
          <form onSubmit={this.handleOtpSubmit}>
            <div className=''>
              <div className='form-group'>
                <input
                  type='text'
                  name='otpval'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Verify OTP '
                  value={this.state.otpval}
                  onChange={this.handleOtpChange}
                />

              </div>
            </div>

            <div className='submitButtonVerification'>
              <SubmitButton name={'submit'} type={'submit'} />
            </div>
          </form>

        </div>
      </div>
    )
  }
  render () {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'x-amz-acl': 'public-read'
    }
    this.facebookButton = (
      <div className='facebookWrapper'>
        <div className='facebookIconWrapper text-right'>
          <img src={facebookIcon} className='facebookIcon' />
        </div>
        <div className='facebookText text-left'>
          {' '}<Facebookbutton referral_code={this.state.referral_code} />
        </div>
      </div>
    )
    this.pannelSizeClass = this.props.screenTypes[0] == 'signUp'
      ? 'popupLayoutContainer'
      : 'popupLayoutContainerMin'
    return (
      <div className={this.pannelSizeClass}>
        {this.renderPanelConditionaly(this.facebookButton)}
        {/* <TabContainer/> */}
        {this.renderPopup()}
      </div>
    )
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
    errorhandel: state.errorhandel
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators(
      {
        submitLoginForm,
        registerData,
        submitPhoneForm,
        submitOtpForm,
        switchAction,
        switchScreen,
        submitPhoneRequestForm
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(popupLayout)
