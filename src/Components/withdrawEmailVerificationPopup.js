import React, { Component } from 'react'
import '../Stylesheets/withdrawEmailVerificationPopup.css'
import closeicon from '../Images/closeicon.png'
import SubmitButton from '../Components/answerButton'
import PopupLayoutLogo from './popupLayoutLogo.js'
import Spinner from './spinner'
let thisRef = ''
class WithdrawEmailVerification extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { withdrawEmailVerificationshow: false}
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ withdrawEmailVerificationshow: !thisRef.state.withdrawEmailVerificationshow })
  }
  renderSpinner () {
    if (thisRef.state.spinner) {
      return <Spinner />
    }
  }
  // this.setState({ spinner: true })
  // this.renderSpinner()
  render () {
    return (
      <div className='withdrawEmailVerificationPopupContainer'>
        <div className='withdrawEmailVerificationPopupView'>
          <div className='withdrawEmailVerificationMainDiv'>
          <div className='withdrawEmailVerificationText'>
            <div className="withdrawEmailVerificationTextTop">
            <text>Verification email has been sent to your email address.</text>
            </div>
            <div className="withdrawEmailVerificationTextBottom">
            <text>Kindly click on the link sent in the email to complete verification process.</text>
            </div>
            </div>
          </div>
        </div>
        <div className='withdrawEmailVerificationCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive withdrawEmailVerificationCloseImg'
          />

        </div>
      </div>
    )
  }
}
export default WithdrawEmailVerification
