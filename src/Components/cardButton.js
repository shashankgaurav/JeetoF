import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-image-slider';
// import Modal, { closeStyle } from 'simple-react-modal'
import SkyLight from 'react-skylight';
import '../Stylesheets/cardButton.css';
import Rupee from '../Images/rupee icon-min.png';
import QuestionMark from '../Images/Question mark icon.png';
import Popup from '../Images/PopupScreen.png';
import PayTablePopup from './payTablePopup.js';
import { payTableAction } from '../Actions/payTableAction';
import {setcarddata, buttonSelect} from '../Actions/buttonSelectAction.js'
import { reactLocalStorage } from 'reactjs-localstorage';
import PayEntryFeeDeduction from '../Components/payEntryFeeDeduction';
import PayEntryFeeJackpot from '../Components/payEntryFeeJackpotPopup';
import PayEntryFeeInsufficientBalance from '../Components/payEntryFeeInsufficientBalance'
import { getQuizAction } from '../Actions/getQuizDetailsActions';
import { API_URL } from '../constants';
import white from '../Images/white-min-min.png';
import transparent from '../Images/transparent_patch_small.png';
import scorePlate from '../Images/scorePlate.png';
import moment from 'moment';
import { read_cookie, bake_cookie } from 'sfcookies';
let myVar;
let newThis = this;
const Router = require('react-router');
const _ = require('lodash');
let thisRef;
let cookeiesdata ;
let jeetomoneydata ;
let row = [];
let roomTypes = [];
let temp = [];
let numberOfWinners = [];
let numberOfPlayers = [];
let numberOfVideos = [];
let numberOfQuestions =[];
let rankOneWin = [];
class CardButton extends Component {
    constructor(props) {
        super(props);
        thisRef=this
        this.state = { cardType: 'normalCard',
                       show: false,
                       Lists: [],
                       carddata: null,
                       payEntryFeeDeductionshow:false,
                       payEntryFeeJackpotshow:false,
                       payEntryFeeInsufficientBalanceshow:false,
                       quizId: 0,
                       timeRemaining: moment('1900-01-01 00:00:00').add(0 / 1000, 'seconds').format('HH:mm:ss'),
                       isDisabled: true,
                       isStarted: true,
                       win:0
                     }
    }

    componentWillMount = () => {
      jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
      cookeiesdata = read_cookie('cookeiesdata')
   }
    handleClose = () => {
      this.setState({show: false});
    }

    togglePopup = (event) => {
      this.setState({show : true});
      let win = event.currentTarget.id;
      if(this.props.room !== []){
        if(Object.keys(this.props.room).length > 0) {
          row = this.props.room;
        }else{
          row = 10;
        }
         roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}), ['is_jackpot'], ['asc'])

          numberOfWinners = roomTypes[win].number_of_winners;
          numberOfPlayers = roomTypes[win].number_of_players;
          numberOfVideos = roomTypes[win].number_of_videos_to_be_shown;
          numberOfQuestions = (roomTypes[win].number_of_videos_to_be_shown)*(roomTypes[win].number_of_questions_to_answer_per_video);
          const payload = {
            win,
            row,
            numberOfWinners,
            numberOfPlayers,
            numberOfVideos,
            numberOfQuestions
          }
          this.props.payTableAction(payload);

        }
    }

    cardplayerdata(index,carddata){
      if(Object.keys(this.props.cardData).length > 0) {
        var card = this.props.cardData;
      }else{
        var card = carddata;
      }
        return(
          <div className='cardBottomView'>
          <div className="cardButtonFirstText">
          {(card.player[index]) ? <text className="textForcardButton">{card.winner[index]} Winners</text> : null}
          </div>
          <div className="cardButtonSecondText">
              {(card.player[index]) ? <text className="textForcardButton">{card.player[index]} players</text> : null}
          </div>
        </div>
        )
    }


fetch_Quiz = (win, jeetomoneydata, numberOfQuestions) => {
  let fullQuestionArray = [];
  for(let i = 0; i < numberOfQuestions; i++) {
           fullQuestionArray.push({"questionNo": i+1, "status":white, "background": transparent  })
         }
  fullQuestionArray = fullQuestionArray.reverse();
  fullQuestionArray[numberOfQuestions-1].background = scorePlate;
  const quizPayload = {
      playerId: jeetomoneydata.jeetomoney.userdata.master_players_id,
      quizId: this.state.quizId,
      roomType: roomTypes[win].master_room_types_id,
      entryFee: roomTypes[win].entry_fee_in_Rs,
      skill: jeetomoneydata.jeetomoney.userdata.masterPlayerGameStatistics.skill_score,
      rating: jeetomoneydata.jeetomoney.userdata.masterPlayerGameStatistics.skill_star_rating
    }

    const quizStatusPayload = {
      time_taken_for_score: 0,
      overall_time_taken: 0,
      time_taken_to_watch_videos:0,
      number_of_questions_answered:0,
      number_of_questions_to_answer_per_video: roomTypes[win].number_of_questions_to_answer_per_video,
      currentBlockQuestion: 0,
      score:0
    }

  const quiz_url = API_URL+'/v1/getVideoForQuiz/' + quizPayload.playerId + '/language/1/quizID/' + quizPayload.quizId + '/roomType/' +quizPayload.roomType;
  this.props.getQuizAction(quiz_url);
  let jeetomoney12345 = {
                            room_selected: jeetomoneydata.jeetomoney.room_selected,
                            userdata: jeetomoneydata.jeetomoney.userdata,
                            metadata: jeetomoneydata.jeetomoney.metadata,
                            no_of_videos: numberOfVideos,
                            quizPayload: quizPayload,
                            numberOfQuestions: numberOfQuestions,
                            current_video: 0,
                            fullQuestionArray: fullQuestionArray,
                            time_taken_for_score: 0,
                            overall_time_taken: 0,
                            time_taken_to_watch_videos:0,
                            number_of_questions_answered:0,
                            number_of_questions_to_answer_per_video: roomTypes[win].number_of_questions_to_answer_per_video,
                            number_of_questions: numberOfQuestions,
                            currentQuestion: 1,
                            score:0,
                            total_account_balance: jeetomoneydata.jeetomoney.userdata.masterPlayerGameAccountDetails.total_account_balance
                          };

   reactLocalStorage.setObject('jeetomoneydataweb', {'jeetomoney': jeetomoney12345});
   Router.browserHistory.push('/VideoPlayerScreen')
}

redirect = () => {
  let win;
  if (Object.keys(this.props.room).length > 0){win = this.state.win}else{ win = 0}
  if(this.props.room !== []){
    const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
      if(Object.keys(this.props.room).length > 0) {
    row = this.props.room;
  }else{
    row = 10;
  }

   roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}), ['is_jackpot'], ['asc']);
    numberOfWinners = roomTypes[win].number_of_winners;
    numberOfPlayers = roomTypes[win].number_of_players;
    numberOfVideos = roomTypes[win].number_of_videos_to_be_shown;
    numberOfQuestions = (roomTypes[win].number_of_videos_to_be_shown)*(roomTypes[win].number_of_questions_to_answer_per_video);
    const payload = {
      win,
      row,
      numberOfWinners,
      numberOfPlayers,
      numberOfVideos,
      numberOfQuestions
    }

    let jeetomoney12345 = {
                              room_selected: row,
                              userdata: jeetomoneydata.jeetomoney.userdata,
                              metadata: jeetomoneydata.jeetomoney.metadata,
                              no_of_videos: numberOfVideos,
                              numberOfQuestions: numberOfQuestions,
                              current_video: 0,
                              time_taken_for_score: 0,
                              overall_time_taken: 0,
                              time_taken_to_watch_videos:0,
                              number_of_questions_answered:0,
                              number_of_questions_to_answer_per_video: roomTypes[win].number_of_questions_to_answer_per_video,
                              number_of_questions: numberOfQuestions,
                              currentQuestion: 1,
                              score:0,
                              total_account_balance: jeetomoneydata.jeetomoney.userdata.masterPlayerGameAccountDetails.total_account_balance - row
                            };


    this.props.payTableAction(payload);
    this.fetch_Quiz(win, jeetomoneydata, numberOfQuestions);
    }
}

    payEntryFeeDeduction = (event) => {
      this.setState({win: event.currentTarget.id});
    if(jeetomoneydata.jeetomoney.userdata.masterPlayerGameAccountDetails.total_account_balance >= this.props.room){
      thisRef.setState({payEntryFeeDeductionshow:true})
    }else{
      // thisRef.setState({payEntryFeeJackpotshow:true})
      thisRef.setState({payEntryFeeInsufficientBalanceshow:true})
    }
      // this.props.showdectionpopup('20');
    }

    payEntryFeeJackpotPopup () {
      if (thisRef.state.payEntryFeeJackpotshow) {
        return (
          <PayEntryFeeJackpot  onPress={() => thisRef.setState({ payEntryFeeJackpotshow: false })}
          />
        )
      } else {
        ;<span />
      }
    }

    payEntryFeeDeductionPopup () {
      if (thisRef.state.payEntryFeeDeductionshow) {
        return (
          <PayEntryFeeDeduction  onPress = {() => thisRef.setState({ payEntryFeeDeductionshow: false })}
                                 click = {(event) => {this.redirect()}}
          />
        )
      } else {
        ;<span />
      }
    }

    payEntryFeeInsufficientBalancePopup () {
      if (thisRef.state.payEntryFeeInsufficientBalanceshow) {
        return (
          <PayEntryFeeInsufficientBalance  onPress={() => thisRef.setState({ payEntryFeeInsufficientBalanceshow: false })}
          />
        )
      } else {
        ;<span />
      }
    }


  componentDidMount = () => {
    const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
    const row = 10;
    const roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}), ['is_jackpot'], ['asc'])
    let jackpot = _.map(roomTypes, "is_jackpot");
    roomTypes.map((item, i) => {
      if(jackpot[i]){

      let startDate = roomTypes[i].jackpot_start_time;
      let expiryDate = roomTypes[i].jackpot_end_time;
      let currentTime = moment(); // .format('YYYY-MM-DD HH:mm:ss')
      expiryDate = moment(expiryDate, 'YYYY-MM-DD HH:mm:ss');
      startDate = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
      let timeRemaining = expiryDate.diff(currentTime);
      let isStarted = currentTime.diff(startDate) > 0;
      let isDisabled = isStarted && timeRemaining > 0;
      if (timeRemaining > 0 && this.state.isStarted) {

         myVar = setInterval(function () {
            let newTemp = expiryDate.diff(moment())
            let timeRemaining = moment('1900-01-01 00:00:00')
                                .add(newTemp / 1000, 'seconds')
                                .format('HH:mm:ss')

            if (newTemp > 0) {
                thisRef.setState({ timeRemaining: timeRemaining });
            } else {
                thisRef.setState({ timeRemaining: 'expired', isDisabled: true });
                clearInterval(myVar)
              }
            }, 1000)
          }
        }
      })
        }


    render() {
      const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
      const row = 10;
      // const roomTypes = _.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}, );
      const roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}), ['is_jackpot'], ['asc'])
      let jackpot = _.map(roomTypes, "is_jackpot");
      let states = []
      let winner = [];
      let player = [];
      roomTypes.forEach(function (rooms) {
      const temp = _.map(rooms.payTable, 'winning_amount')
          winner.push(rooms.number_of_winners);
          player.push(rooms.number_of_players);
          states.push(temp[0]);
    }.bind(this))
    let carddata = {
      winner: winner,
      player: player
    }
    // this.props.setcarddata(carddata);
    // this.props.buttonSelect(states);
        if(this.props.button !== undefined) {
              var data = this.props.button;
        }else{
          var data = states;
        }
              const Lists = data.map((item, i) => {
                if(!(jackpot[i])){
                  if (cookeiesdata.userdetailsStore.Stage == 1) {
                    return (
                          <div className = {(i == 1) ? "card card-disable" : "card"}>
                                          <div className="cardButtonInnerDiv" id = {i} onClick={this.payEntryFeeDeduction}>
                                              <div className='cardTopView' key = {i}>
                                                <div className="jeetoMoneyName">
                                                </div>
                                                <div className="jeetoMoneyPrice">
                                                  <img src={Rupee} className="rupeeSymbol" />
                                                  <text className="textForPrice" key = {i}>{item}</text>
                                                </div>
                                              </div>
                                              {this.cardplayerdata(i,carddata)}
                                              </div>
                                              <div className="questionMark" id = {i} onClick={ this.togglePopup }>
                                                <img src={QuestionMark} />
                                              </div>
                                      </div>)
                  }else{
                return (
                <div className = "card">
                    <div className="cardButtonInnerDiv" id = {i} onClick={this.payEntryFeeDeduction}>
                        <div className='cardTopView' key = {i}>
                          <div className="jeetoMoneyName">
                          </div>
                          <div className="jeetoMoneyPrice">
                            <img src={Rupee} className="rupeeSymbol" />
                            <text className="textForPrice" key = {i}>{item}</text>
                          </div>
                        </div>
                        {this.cardplayerdata(i,carddata)}
                        </div>
                        <div className="questionMark" id = {i} onClick={ this.togglePopup }>
                          <img src={QuestionMark} />
                        </div>
                </div>)}
                }else{
                  return (
                <div className = {(cookeiesdata.userdetailsStore.firstUserExperience || (this.state.timeRemaining === "00:00:00")) ? "card card-disable" : "card"}>
                <div className="jackpotButtonInnerDiv" id = {i} onClick={ this.payEntryFeeDeduction }>
                    <div className='cardTopView' key = {i}>
                      <div className="jeetoMoneyName">
                      </div>
                    </div>
                    <div className="jackpotTime">
                    <text className="time_for_jackpot" key = {i}>{this.state.timeRemaining}</text>
                    </div>
                    </div>
                    <div className="questionMark" id = {i} onClick={ this.togglePopup }>
                      <img src={QuestionMark} />
                    </div>
                  </div>
          )}
        })

        return (
          <div>
            <div className="cardButtonMainDiv">
              <Slider Lists={Lists} isInfinite visibleItems={3}>
                {Lists.map((list, i) => <div key={i}>{list} </div>)}
              </Slider>
            </div>
            {(this.state.show) ? <PayTablePopup show = {this.handleClose}/> : null};
            {thisRef.payEntryFeeDeductionPopup()}
            {thisRef.payEntryFeeJackpotPopup()}
            {thisRef.payEntryFeeInsufficientBalancePopup()}
        </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps) (CardButton);
