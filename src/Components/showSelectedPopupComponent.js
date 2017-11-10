import React, { Component } from 'react'
import '../Stylesheets/myProfileSelectionPopup.css'
import SubmitButton from '../Components/answerButton'
import languageSelectedButton from '../Images/settingLanguageSelected.png'
import languageUnSelectedButton from '../Images/settingLanguageUnselected.png'
import defaultImage from '../Images/Answer questions.png'
import progressIcon from '../Images/progressIcon.png'
import { reactLocalStorage } from 'reactjs-localstorage';
import closeicon from '../Images/closeicon.png'
import settingHeadingImage from '../Images/settingsHeaderImage.png'
import SettingsButton from '../Components/settingsScreenButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Rating from '../Components/rating'
const Router = require('react-router')

class ShowSelectedPopupComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profileButtonLable: 'My Profile',
      performanceButtonLable: 'My Performance',
      show: false,
      previousTarget: null,
      profileButtonLable: 'My Profile',
      logoutButton: 'LOGOUT',
      volume: 0
    }
  }

  handleOnChange = value => {
    this.setState({
      volume: value
    })
  }

  changeLanguageBtnClass = event => {
    if (this.state.previousTarget !== null) {
      this.state.previousTarget.classList.remove('languageBtnActive')
    }
    event.currentTarget.classList.add('languageBtnActive')
    this.setState({ previousTarget: event.currentTarget })
  }

  logoutOnClick = () => {
    Router.browserHistory.push('/HomeScreen')
  }

  goToMyProfileScreen = () => {
    Router.browserHistory.push({
      pathname: '/LargeBackgroundScreen',
      state: { screenName: 'myProfile' }
    })
  }

goToMyPerformanceScreen = () => {
  Router.browserHistory.push({
    pathname:'/LargeBackgroundScreen',
    state: {screenName: 'myPerformance'}
  })
}

  render () {
    switch (this.props.popupDetails.popUpName) {
      case 'MyProfileSelectionPopUp':
        return this.renderMyProfileSelectionPopUpComponent()
      case 'MySettingsPopUp':
        return this.renderMySettingsPopUpComponent()
      case 'Default':
        return this.renderDefaultComponent()
    }
  }

  renderMyProfileSelectionPopUpComponent () {
    const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
    const user = jeetomoneydata.jeetomoney.userdata;
    return (
      <div>
        <div className='myScreenBackground'>
          {/* <div className='buttonsContainer'>
          <div className='myProfileTopDiv' />
          <div className='myProfileMiddleDiv'>
            <div className='buttonsContainer'>
              <div className='row myProfileButtonDiv' onClick={this.goToMyProfileScreen}>
                <SubmitButton name={this.state.profileButtonLable} />
              </div>
              <div className='row myProfileBlankDiv' />
              <div className='row myPerformanceButtonDiv' onClick={this.goToMyPerformanceScreen}>
                <SubmitButton name={this.state.performanceButtonLable} />
              </div>
            </div>
          </div>
          <div className='myProfileBottomDiv' />
        </div> */}
          <div className='settingProfileContainer'>
            <div className='settingUserContainer'>
              <div className='settingUserImage'>
                {(user.profile_picture_url)? <img src={user.profile_picture_url} className='img img-thumbnail' /> : <img src={defaultImage} className='img img-thumbnail' />}
              </div>
              <div className='settingUserName'>
                Narendra Sharma
              </div>
              <div className='settingUserRating'>
                <Rating ratingCount={user.masterPlayerGameStatistics.skill_star_rating}/>
              </div>
              <div
                className='myProfileButtonDiv'
                onClick={this.goToMyProfileScreen}
              >
                <SubmitButton name={this.state.profileButtonLable} />
              </div>
            </div>

          </div>
          <div className="profilePageDivider">
            </div>
          <div className='settingPerformanceContainer'>
            <div className='settingPerformanceImage'>
                <img src={progressIcon} className='' />
              </div>
            <div
              className='row myPerformanceButtonDiv'
              onClick={this.goToMyPerformanceScreen}
            >
              <SubmitButton name={this.state.performanceButtonLable} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMySettingsPopUpComponent () {
    let { volume } = this.state
    return (
      <div>
        <div className='myScreenBackground'>
          <div className='row settingsContainer'>
            <div className='row settingsHeadingDiv'>
              <div className='settingImgDiv'>
                {' '}<img src={settingHeadingImage} />
              </div>
            </div>
            <div className='row settingLanguageRow'>
              <div className='settingLanguageLable'>
                {' '}
                Language
              </div>
              <div className='selectLanguageModeBg'>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2' />
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 settingLanguageButtons'>
                  <div
                    className='languageUnSelectedButton'
                    onClick={this.changeLanguageBtnClass}
                  >
                    <div className='settingsLanguageText'>English</div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 settingLanguageButtons'>
                  <div
                    className='languageUnSelectedButton'
                    onClick={this.changeLanguageBtnClass}
                  >
                    <div className='settingsLanguageText'>Hindi</div>
                  </div>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2' />
              </div>
            </div>
            <div className='row settingManageVolumeRow'>
              <div className='settingVolumeLable'>
                {' '}
                volume
              </div>
              <div className='changeVolumeSlider'>
                <Slider
                  value={volume}
                  orientation='horizontal'
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div className='row settingFooter'>
              <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4' />
              <div
                className='col-lg-4 col-md-4 col-sm-4 col-xs-4 settingScreenLogoutButton'
                onClick={this.logoutOnClick}
              >
                <SubmitButton name={this.state.logoutButton} />
              </div>
              <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4' />
            </div>
          </div>
          
        </div>
      </div>
    )
  }

  renderDefaultComponent () {
    return (
      <div className='defaultComponent'>
        This is Default Component loaded
      </div>
    )
  }
}

export default ShowSelectedPopupComponent
