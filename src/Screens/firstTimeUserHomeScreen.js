import React, { Component } from 'react'
import '../Stylesheets/popupLayout.css'
import '../Stylesheets/firstTimeUserHomeScreen.css'
import singleplayer from '../Images/Single-player-min.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerData } from '../Actions/registerAction'
import PopupLayoutLogo from '../Components/popupLayoutLogo'
import congratulation from '../Images/Congratulation.png'
import SubmitButton from '../Components/answerButton.js'
const Router = require('react-router')

class FirstTimeUserHomeScreen extends Component {
  constructor (props) {
    super(props)
    this.pannelSizeClass = ''
  }

  handleredirectplayer (event) {
    Router.browserHistory.push('/HomeScreen')
  }

  render () {
    return (
      <div className='container-fluid loginScreen'>
        <div className='middleScreen'>
          <div className='popupLayoutContainerMin container'>
            <div className='firstTimeUserPopup'>
              <div className='play-text-wrapper'>
                <div className='play-text'>Now you can play</div>
              </div>
              <div className='firstTimeUserPopup-middele-warapper row'>
                <div className='playTypeCardPlayer col-md-6'>
                  <img
                    src={singleplayer}
                    className='firstTimeUserPopup-image img img-responsive'
                  />
                </div>
                <div className='playTypeCardDetail col-md-6'>
                  <img
                    src={singleplayer}
                    className='firstTimeUserPopup-image2 img img-responsive'
                  />
                </div>
              </div>
              <div className='firstTimeUserPopup-button row'>
                <div className='col-md-4 col-md-offset-4'>
                  <SubmitButton name={'Next'} />
                </div>
              </div>
            </div>
            <div />
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
    verifyUser: state.verify
  }
}
export default connect(mapStateToProps, null)(FirstTimeUserHomeScreen)
