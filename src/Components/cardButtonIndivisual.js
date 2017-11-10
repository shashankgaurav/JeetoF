import React, { Component } from 'react'
import '../Stylesheets/cardButtonIndivisual.css'
import PayTablePopup from '../Components/payTablePopup'
import { reactLocalStorage } from 'reactjs-localstorage'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { read_cookie } from 'sfcookies'
import { payTableAction } from '../Actions/payTableAction';
import {setcarddata, buttonSelect} from '../Actions/buttonSelectAction.js';
import { getQuizAction } from '../Actions/getQuizDetailsActions';

let cookeiesdata = read_cookie('cookeiesdata')
let thisRef = ''
let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
console.log(cookeiesdata);
const _ = require('lodash');
class cardButtonIndivisual extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPayTable: false,
      show: false
    }
    thisRef = this
  }

  togglePopup = (event) => {
    console.log ("Hello");
    let win;
    if(this.props.room !== []){
      let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
      const row = 10
      let roomTypes = _.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)});
      console.log(roomTypes[1]);
      if ( cookeiesdata.userdetailsStore.Stage === 1){
          roomTypes = roomTypes[1];
          win = 1;
            }else{
              roomTypes = roomTypes[2];
             win = 2;
            }
      const temp = _.map(roomTypes.payTable, 'winning_amount');
      let states = temp[0]
      let numberOfWinners = roomTypes.number_of_winners
      let numberOfPlayers = roomTypes.number_of_players
        let numberOfVideos = roomTypes.number_of_videos_to_be_shown;
       let numberOfQuestions = (roomTypes.number_of_videos_to_be_shown)*(roomTypes.number_of_questions_to_answer_per_video);
        const payload = {
         win,
          row,
          numberOfWinners,
          numberOfPlayers,
          numberOfVideos,
          numberOfQuestions
        }
        console.log(payload);
        this.props.payTableAction(payload);
        this.props.handleOpen();
      
        reactLocalStorage.setObject('jeetomoneyquizPayload.dataweb', {'no_of_videos': numberOfVideos});

      }
  }
  render () {
      if( cookeiesdata.userdetailsStore.firstUserExperience === true){
    const row = 10
    let roomTypes = _.filter(
      jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType,
      { entry_fee_in_Rs: parseInt(row) }
    )
    console.log(roomTypes);
    if ( cookeiesdata.userdetailsStore.Stage === 1){
        roomTypes = roomTypes[1];
          }else{
            roomTypes = roomTypes[2];
          }
    const temp = _.map(roomTypes.payTable, 'winning_amount');
    let states = temp[0]
    console.log(states);
    let winner = roomTypes.number_of_winners
    let player = roomTypes.number_of_players
    // roomTypes.forEach(
    //   function (rooms) {
    //     winner.push(rooms.number_of_winners)
    //     player.push(rooms.number_of_players)
    //     states.push(temp[0])
    //   }
    // )
    // let carddata = {
    //   winner: winner,
    //   player: player
    // }
    // console.log(carddata);
    return (
        <div>
      <div className='cardButtonIndivisualPanel'>
        <div className='cardIndRuppes'>
          ₹ {states}
        </div>
        <div className='cardIndPlayers'>
          <div className='cardIndWinner'>{winner} Winner</div>
          <div className='cardIndPlayer'>{player} Player</div>
        </div>
        <div className='questionButton' onClick={ this.togglePopup }/>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(cardButtonIndivisual)
