import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RoomSelectionButton from './RoomSelectionButton'
import CardButton from './cardButton'
import '../App.css'
import '../Stylesheets/header.css'
import MainBackground from '../Images/mainbackgroundminmin.jpg'
import HeaderProfileImage from '../Images/headerProfileImage.png'
import HeaderMoneybar from '../Images/headerMoneybar.png'
import UserImage from '../Images/1366/defaultIcon.png'
import coins from '../Images/coins.png'
import amountPlate from '../Images/amountPlate.png'
import namePlate from '../Images/1366/namePlate.png'

import { reactLocalStorage } from 'reactjs-localstorage'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Rating from '../Components/rating'
import SettingsPopupLayoutComponent from './settingsPopupLayoutComponent';
const Router = require('react-router');


class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating: 0,
      showProfilePopup: false,
      isFetching: true
     }
  }

  componentDidMount = () => {
    let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
  }
  accountBalanceRedirection()
  {
    Router.browserHistory.push('/AccountBalance')
  }

  handleClose = () => {
    this.setState({showProfilePopup : false})
  }

  redirectToProfile = () => {
    this.setState({showProfilePopup : true})
  }

  render () {
    let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
    console.log(jeetomoneydata)
    let username =
      jeetomoneydata.jeetomoney.userdata.firstName +
      ' ' +
      jeetomoneydata.jeetomoney.userdata.lastName
    let profileimage = jeetomoneydata.jeetomoney.userdata.profile_picture_url
    return (
      <div className='headerComponentPanel'>
        <div className = "profile_popup">
          {(this.state.showProfilePopup) ? <SettingsPopupLayoutComponent close = {this.handleClose}/> : null }
        </div>
        <div className='innerLeftDiv col-xs-6 col-md-6 col-lg-6 col-xl-6 col-sm-6'>
          <div className='headerProfileDiv col-xs-7 col-md-7 col-lg-7 col-xl-7 col-sm-7' onClick = {this.redirectToProfile}>
            <div className='profileImage'>
              {jeetomoneydata.jeetomoney.userdata.profile_picture_url
                ? <img
                  src={profileimage}
                  className='img-responsive userProfileImage'
                  />
                : <img
                  src={UserImage}
                  className='img-responsive userProfileImage'
                  />}
            </div>
            <div className='userProfileName'>
              <img src={namePlate} className="userProfileNamePlateImage" />
              <div className="userNameImage">
              {username}
              </div>
            </div>
          </div>
          <div className='headerStarDiv col-xs-5 col-md-5 col-lg-5 col-xl-5 col-sm-5'>
            <Rating
              ratingCount={
                jeetomoneydata.jeetomoney.userdata.length > 0
                  ? jeetomoneydata.jeetomoney.userdata
                      .masterPlayerGameStatistics.skill_star_rating
                  : this.state.rating
              }
            />
          </div>
        </div>

        <div className='innerRightDiv col-xs-6 col-md-6 col-lg-6 col-xl-6 col-sm-6'>
          <div className='headerMoneyLeftDiv col-xs-4 col-lg-4 col-xl-4 col-md-4 col-sm-4' />
          <div className='headerMoneyDiv col-xs-8 col-lg-8 col-xl-8 col-md-8 col-sm-8'>
            <div className='headerMoneySymbol'>
              <img src={coins} className="img img-responsive" />
            </div>
            <div className='userMoneyStatus' onClick={this.accountBalanceRedirection}>
              <img src={amountPlate} className="img img-responsive" />
              <div className="userMoneyStatusScore">
              {
                jeetomoneydata.jeetomoney.total_account_balance
              }
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
const mapStateToProps = state => {
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
export default connect(mapStateToProps, null)(Header)
