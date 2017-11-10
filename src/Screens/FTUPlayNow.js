import React, { Component } from 'react'
import '../Stylesheets/FTUPlayNow.css'
import Button from '../Components/answerButton'
import PopupLogo from '../Components/popupLayoutLogo'
import CardButton from '../Components/cardButton'
import CardButtonIndivisual from '../Components/cardButtonIndivisual'
import PopupBox from '../Components/popUpBox'
import PayTablePopup from '../Components/payTablePopup'
import { reactLocalStorage } from 'reactjs-localstorage'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { read_cookie } from 'sfcookies'
import { payTableAction } from '../Actions/payTableAction';
import {setcarddata, buttonSelect} from '../Actions/buttonSelectAction.js';
import { getQuizAction } from '../Actions/getQuizDetailsActions';
const Router = require('react-router')
let thisRef = ''
let jeetomoneydata
let cookeiesdata
const _ = require('lodash');
class FTUPlay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    thisRef = this
  }
  componentWillMount = () => {
     jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
     cookeiesdata = read_cookie('cookeiesdata')    
  } 

  handleClose = () => {
    this.setState({ show: false })
  }

  handleOpen = () => {
    this.setState({ show: true })
  }
  redirectToHome = () => {
    Router.browserHistory.push('/HomeScreen')
  }
  togglePopup = event => {
    let win
      // let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
      const row = 10
      let roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}), ['is_jackpot'], ['asc'])
      console.log(roomTypes[1])
      if (cookeiesdata.userdetailsStore.Stage === 1) {
        roomTypes = roomTypes[0]
        win = 0
      } else {
        roomTypes = roomTypes[1]
        win = 1
      }
      const temp = _.map(roomTypes.payTable, 'winning_amount')
      let states = temp[0]
      let numberOfWinners = roomTypes.number_of_winners
      let numberOfPlayers = roomTypes.number_of_players
      let numberOfVideos = roomTypes.number_of_videos_to_be_shown
      let numberOfQuestions =
        roomTypes.number_of_videos_to_be_shown *
        roomTypes.number_of_questions_to_answer_per_video
      const payload = {
        win,
        row,
        numberOfWinners,
        numberOfPlayers,
        numberOfVideos,
        numberOfQuestions
      }
      console.log(payload)
      this.props.payTableAction(payload)
      this.handleOpen()

      reactLocalStorage.setObject('jeetomoneyquizPayload.dataweb', {
        no_of_videos: numberOfVideos
      })
    
  }
  render () {
    if( cookeiesdata.userdetailsStore.firstUserExperience === true){
    const row = 10
    let roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}), ['is_jackpot'], ['asc'])
    console.log(roomTypes);
    if ( cookeiesdata.userdetailsStore.Stage === 1){
        roomTypes = roomTypes[0];
          }else{
            roomTypes = roomTypes[1];
          }
    const temp = _.map(roomTypes.payTable, 'winning_amount');
    let states = temp[0]
    console.log(states);
    let winner = roomTypes.number_of_winners
    let player = roomTypes.number_of_players
    return (
      <div className='FTUPlayNowWrapper'>
        <div className='FTUPlayNowPanel'>
          <div className='FTUPlayNowDivWrapper'>
            <div className='playText'>
              Now You Can Play
            </div>
            <div className='FTUPlayNowCardDivWrapper row'>

              <div className='FTUPlayCard' />
              <div className='FTUPlayGameCard'>
                <div className='FTUcardRuppes'>
                  ₹ {states}
                </div>
                <div className='FTUPcardPlayers'>
                  <div className='FTUPcardWinner'>{winner} Winner</div>
                  <div className='FTUPcardPlayer'>{player} Player</div>
                </div>
                <div className='questionButton' onClick={this.togglePopup} />
                {/* <CardButtonIndivisual handleOpen = {this.handleOpen} /> */}
              </div>
            </div>
            <div
              className='FTUPlayNowButtonPanel'
              onClick={this.redirectToHome}
            >
              <Button name={'Play Now!'} />

            </div>
          </div>
        </div>
        {this.state.show ? <PayTablePopup show={this.handleClose} /> : null};

      </div>
    )
  }
  }
}
const mapStateToProps = (state) => {
    return{
      button: state.button[0],
      data: state.splash,
      room: state.room,
      cardData: state.cardData,
      quiz: state,
      deductAmountPopup: state.deductAmountPopup
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
      ...bindActionCreators({payTableAction, setcarddata, buttonSelect, getQuizAction} ,dispatch)
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(FTUPlay)

