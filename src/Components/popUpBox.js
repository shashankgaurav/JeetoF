import React, { Component } from 'react'
import '../Stylesheets/popupLayout.css'
import closeicon from '../Images/closeicon.png'
import Button from '../Components/answerButton'
const Router = require('react-router')
let thisRef = ''
class PopUpBox extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { showAlert: false }
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ showAlert: !thisRef.state.showAlert })
  }
  redirectToAfterSignup () {
    Router.browserHistory.push('/AfterSignup')
  }

  renderAlert (flag) {
    if (flag != 'fbPopup') {
      return (
        <div className='alertPopupView'>
          <div className='alertImage' />
          <div className='alertCloseBtnView' onClick={thisRef.props.onPress}>
            <img src={closeicon} className='img img-responsive closeImg' />
          </div>
          <div className='alertErrorText'>
            {this.props.message}
          </div>
        </div>
      )
    } else {
      return (
        <div className='alertPopupViewFb'>
          <div className='alertImage' />
          <div className='alertErrorTextFb'>
            {this.props.message}
          </div>
          <div className='alertButtonPanel'>
            <div
              className='withoutSharing'
              onClick={this.redirectToAfterSignup}
            >
              <Button name={'Continue without sharing'} />
            </div>
            <div className='withSharing'>
              <Button name={'Change setting and continue'} />
            </div>
          </div>
        </div>
      )
    }
  }
  render () {
    return (
      <div className='alertPopupContainer'>
        {/* type for alert fbPopup and regular alert */}
        {this.renderAlert(this.props.alertType)}
      </div>
    )
  }
}
export default PopUpBox
