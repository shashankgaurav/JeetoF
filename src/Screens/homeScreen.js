import React, { Component } from 'react'
import '../Stylesheets/homeScreen.css'
import Header from '../Components/header'
import GameTypeButton from '../Components/gameTypeButtons'
import OvalButton from '../Components/ovalButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProfileData } from '../Actions/homeScreenAction'
import singleplayer from '../Images/singlePlayer.png'
import multiPlayer from '../Images/multiPlayer.png'
import singleplayerNew from '../Images/singlePlayer.png'
import multiPlayerNew from '../Images/multiPlayer.png'
import buttonNotification from '../Images/infoMin.png'
import infoMin from '../Images/infoMin.png'
import leaderboard from '../Images/leaderboard.png'
import setttingIcon from '../Images/settingMin.png'
import { read_cookie } from 'sfcookies'
import { reactLocalStorage } from 'reactjs-localstorage'
const Router = require('react-router')
let refThis = ''
let jeetomoneydata
let cookeiesdata

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.props.getProfileData()
    this.name = ''
    this.gameScore = ''
    refThis = this
  }

  componentWillReceiveProps () {
    jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
    cookeiesdata = read_cookie('cookeiesdata')
    console.log(jeetomoneydata)
    console.log(cookeiesdata)
  }
  componentWillMount () {
    this.props.getProfileData('HomeScreen')
  }

  handleClickInfoButton () {
    Router.browserHistory.push('/InfoLinkScreen')
  }

  handleClickNotificationButton () {
    Router.browserHistory.push({
      pathname: '/LargeBackgroundScreen',
      state: { screenName: 'notifications' }
    })
  }

  handleClickLeaderboardButton () {
    Router.browserHistory.push('/LeaderBoardHistory')
  }
  handleClickSettingButton () {
    alert('handleClickSettingButton')
  }
  handleClickInvitaionButton () {
    alert('handleClickInvitaionButton')
  }
  redirectTOroomselect () {
    Router.browserHistory.push('/RoomSelectionScreen')
  }

  renderfirsttimeexpScreen () {
    const playerTypeArray = [
      { gameImage: singleplayer, gameCounter: 0, gameType: 'singlePlayer' },
      { gameImage: multiPlayer, gameCounter: 30, gameType: 'multiPlayer' }
      // { gameImage: singleplayerNew, gameCounter: 50, gameType: 'comminSoon' },
      // {
      //   gameImage: multiPlayerNew,
      //   gameCounter: 0,
      //   gameType: 'commingVerySoon'
      // }
    ]
    const buttonArray = [
      {
        buttonImageBg: buttonNotification,
        buttonCounter: 0,
        buttonClass: 'buttonNotificationFirstUserHome'
      },
      {
        buttonImageBg: infoMin,
        buttonCounter: 0,
        buttonClass: 'buttonInfoFirstUserHome'
      },
      {
        buttonImageBg: leaderboard,
        buttonCounter: 0,
        buttonClass: 'buttonLeaderboardFirstUserHome'
      },
      {
        buttonImageBg: setttingIcon,
        buttonCounter: 0,
        buttonClass: 'buttonSettingFirstUserHome'
      },
      {
        buttonImageBg: buttonNotification,
        buttonCounter: 0,
        buttonClass: 'buttonMessageFirstUserHome'
      }
    ]

    return (
      <div className='homeScreen'>
        <div className='header'>
          <Header />
        </div>
        <div className='middelContainer'>
          <div className='FTUSinglePlayerMainDiv'>
            <div className='FTUSinglePlayerInnerDiv'>
              <img
                src={singleplayer}
                className='FTUSinglePlayerImg img img-responsive'
                onClick={this.redirectTOroomselect}
              />
            </div>
          </div>
        </div>
        <div className='footerButtonPanel'>
          <div className='buttonPanel'>
            <div className='ovalButton'>
              <OvalButton buttonData={buttonArray[0]} />
            </div>
            <div className='ovalButton'>
              <OvalButton buttonData={buttonArray[1]} />
            </div>
            <div className='ovalButton'>
              <OvalButton buttonData={buttonArray[2]} />
            </div>
            <div className='ovalButton'>
              <OvalButton buttonData={buttonArray[3]} />
            </div>
            <div className='ovalButton'>
              <OvalButton buttonData={buttonArray[4]} />
            </div>

          </div>
        </div>
      </div>
    )
  }

  rendermultiplayerScreen () {
    const playerTypeArray = [
      { gameImage: singleplayer, gameCounter: 0, gameType: 'singlePlayer' },
      { gameImage: multiPlayer, gameCounter: 30, gameType: 'multiPlayer' }
    ]
    const buttonArray = [
      {
        buttonImageBg: buttonNotification,
        buttonCounter: 10,
        buttonClass: 'buttonNotification'
      },
      { buttonImageBg: infoMin, buttonCounter: 0, buttonClass: 'buttonInfo' },
      {
        buttonImageBg: leaderboard,
        buttonCounter: 0,
        buttonClass: 'buttonLeaderboard'
      },
      {
        buttonImageBg: setttingIcon,
        buttonCounter: 0,
        buttonClass: 'buttonSetting'
      },
      {
        buttonImageBg: buttonNotification,
        buttonCounter: 0,
        buttonClass: 'buttonMessage'
      }
    ]
    return (
      <div className='homeScreen'>
        <div className='header'>
          <Header />
        </div>
        <div className='middelContainer'>
          <GameTypeButton imagePath={playerTypeArray} />
        </div>
        <div className='footerButtonPanel'>
          <div className='buttonPanel'>
            <div
              className='ovalButton'
              onClick={this.handleClickNotificationButton}
            >
              <OvalButton buttonData={buttonArray[0]} />
            </div>
            <div className='ovalButton' onClick={this.handleClickInfoButton}>
              <OvalButton buttonData={buttonArray[1]} />
            </div>
            <div
              className='ovalButton'
              onClick={this.handleClickLeaderboardButton}
            >
              <OvalButton
                buttonData={buttonArray[2]}
                onClick={this.handleButtonClick}
              />
            </div>
            <div className='ovalButton' onClick={this.handleClickSettingButton}>
              <OvalButton
                buttonData={buttonArray[3]}
                onClick={this.handleButtonClick}
              />
            </div>
            <div
              className='ovalButton'
              onClick={this.handleClickInvitaionButton}
            >
              <OvalButton
                buttonData={buttonArray[4]}
                onClick={this.handleButtonClick}
              />
            </div>

          </div>
        </div>
      </div>
    )
  }
  renderPlayerUi () {
    let cookeiesdata = read_cookie('cookeiesdata')
    if (cookeiesdata.userdetailsStore.firstUserExperience === true) {
      return refThis.renderfirsttimeexpScreen()
    } else {
      return refThis.rendermultiplayerScreen()
      // }
    }
  }
  render () {
    console.log(this.props)

    return (
      <div>
        {this.renderPlayerUi()}
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
    homeScreenUserdata: state.homeScreen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({ getProfileData }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
