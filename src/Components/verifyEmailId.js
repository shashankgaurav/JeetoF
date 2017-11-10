import React, { Component } from 'react'
import '../Stylesheets/verifyEmailId.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import closeicon from '../Images/closeicon.png'
import SubmitButton from '../Components/answerButton'
import PopupLayoutLogo from './popupLayoutLogo.js'
import Spinner from './spinner'
import { emailVerifySubmit } from '../Actions/emailVerifyAction'
let thisRef = ''
class VerifyEmailId extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = {verifyEmailshow: false}
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ verifyEmailshow: !thisRef.state.verifyEmailshow })
  }
  renderSpinner () {
    if (thisRef.state.spinner) {
      return <Spinner />
    }
  }
  handleEmailChange (event) {
    thisRef.setState({ [event.target.name]: event.target.value })
  }
  handleEmailSubmit(event){
    event.preventDefault()
    thisRef.props.emailVerifySubmit(thisRef.state)
  }
  render () {
    return (
      <div className='verifyEmailIdPopupContainer'>
        <div className='verifyEmailIdPopupView'>
          <div className='verifyEmailIdMainDiv'>
            <div className='mobileNumberVerification'>
              /* {this.renderSpinner()} */
              <div className='popupHeaderPanel '>
                <PopupLayoutLogo />
              </div>
              <div className='formPanelIndiVisual'>
                <form onSubmit={this.handleEmailSubmit}>
                  <div className=''>
                    <div className='form-group'>
                      <input
                        type='email'
                        name='email'
                        className='form-control'
                        id='exampleFormControlInput1'
                        placeholder='Verify Email Id'
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                      />
                      <div className='mobileVerificationText'>
                        We will send verification link to this email id
                      </div>
                    </div>
                  </div>
                  <div className='submitButtonVerification'>
                    <SubmitButton name={'SUBMIT'} type='submit' />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
        <div className='verifyEmailIdCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive verifyEmailIdCloseImg'
          />

        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    // phoneChangeRequest: state.phoneChangeRequest
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({emailVerifySubmit}, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailId)
