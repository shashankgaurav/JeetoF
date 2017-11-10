import React, { Component } from 'react';
import '../Stylesheets/popupLayout.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerData } from '../Actions/registerAction';
import PopupLayoutLogo from '../Components/popupLayoutLogo';
import congratulation from '../Images/Congratulation.png';
import SubmitButton from '../Components/answerButton.js';
const Router = require('react-router')

class FirstTimeUserBonusScreen extends Component {
  constructor (props) {
    super(props)
    this.pannelSizeClass = ''
    // if (this.props.screenTypes[0] == 'signUp') {
    //   this.pannelSizeClass = 'popupLayoutContainer container'
    // } else {
      this.pannelSizeClass = 'popupLayoutContainerMin container'
    // }

    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // thisRef.handleSignUpChange = thisRef.handleSignUpChange.bind(this)
    // thisRef.handleSignUpSubmit = thisRef.handleSignUpSubmit.bind(this)
  }

  handleredirectplayer (event) {
    Router.browserHistory.push('/FTUPlayNow');    
  }

  // renderPanelConditionaly (data) {
  //   console.log(data)
  //   switch ('facebook') {
  //     // switch (this.props.screenTypes[0]){
  //     case 'facebook':
  //       return this.renderUserexpFaceebook()
  //     case 'signUp':
  //       return this.renderUserexpSignup()
  //   }
  // }
  // renderUserexpFaceebook () {
  //   // thisRef.props.generateOTP(dataresponse);
  //   return (
  //     <div className='container-fluid loginScreen'>
  //     <div className='middleScreen'>
  //     <div className='otp'>
  //       <div className='popupHeaderPanel '>
  //         <PopupLayoutLogo />
  //       </div>
  //       <div className='formPanelIndiVisual'>
  //       <form >
  //         <div className=''>
  //           <div class='form-group'>
  //             <input
  //               type='text'
  //               name='otpval'
  //               class='form-control'
  //               id='exampleFormControlInput1'
  //               placeholder='Verify OTP '
               
  //             />
  //           </div>
  //         </div>

  //         <div className='submitButtonVerification'>
  //         </div>
  //       </form>

  //     </div>
  //     </div>
  //     </div>
  //   </div>
  //   )
  // }
  // renderUserexpSignup () {
  //   return (
  //     <div className='container-fluid loginScreen'>
  //     <div className='middleScreen'>

  //     <div className='otp'>
  //       <div className='popupHeaderPanel '>
  //         <PopupLayoutLogo />
  //       </div>
  //       <div className='formPanelIndiVisual'>

  //       </div>
  //     </div>
  //     </div>
  //   </div>
     
  //   )
  // }

  render () {
    return (

      <div className='container-fluid loginScreen'>
      <div className='middleScreen'>
      <div className='popupLayoutContainerMin container'>
      <div className='otp congratsScreen'>
        <div className='formPanelIndiVisual'>
          <div className='congratulations'>
          <img src={congratulation} className='FTUcongratulation img img-responsive'/>
          </div>
          <div className="FTU-bonus-text">
            You have earned <span>&#8377; 20</span><br/> bonus credit!
          </div>
          <div className='FTU-next-button' onClick={this.handleredirectplayer}>
              <SubmitButton name={'Next'} />
            </div>
      </div>
      </div>
      </div>
      </div>
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
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     ...bindActionCreators({ getProfileData }, dispatch)
//   }
// }
export default connect(mapStateToProps, null)(FirstTimeUserBonusScreen);
