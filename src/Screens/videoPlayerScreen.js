import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../Stylesheets/videoPlayerScreen.css';
import Button from '../Components/answerButton';
import PopupLogo from '../Components/popupLayoutLogo';
import ReactPlayer from 'react-player';
import CircularProgressbar from 'react-circular-progressbar';
import ProgressCircle from 'react-progress-circle';
import '../Stylesheets/React_progress_circle.css';
import { reactLocalStorage } from 'reactjs-localstorage';
import moment from 'moment';

const Router = require('react-router');
const _ = require('lodash');
let AccountBalance
let x;
let percentInc;
class VideoPlayerScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: 0,
      percent: 0,
      video: 0,
      video_start_time: moment(),
      percent: 0.0,
      video_fetched: false
    }
  }

componentWillUnmount(){
  clearInterval(this.timer);
}

componentDidMount(){
}

componentWillMount(){
  this.setState({timer: 0, percent: 0});
  // window.addEventListener("beforeunload", this.refresh());
}

// componentWillUnmount (){
//   window.removeEventListener("beforeunload", this.refresh());
// }

refresh = () => {
  window.onbeforeunload = function() {
    alert("ALERT!")
    Router.browserHistory.push('/HomeScreen')
  }
}

 duration = (time_in_sec) => {
   this.setState({video_fetched: true, timer: 0});
   time_in_sec = Math.round(time_in_sec);
   percentInc = (((1 / time_in_sec) * 10 * 100) / 10);
   this.setState({timer: this.state.timer + time_in_sec}, () => {
     clearInterval(this.timer);
     this.timer = setInterval(this.videoTimer, 1000);
   });
  }

  timerStart = () => {
  }

  videoTimer = () => {
    if (this.state.timer > 0) {
      let x = _.round(parseInt(this.state.timer) - 1, 0);
      this.setState({timer: x, percent: this.state.percent + percentInc});

    } else {
      clearInterval(this.timer);
      Router.browserHistory.push('/GameScreen');
    }
  }


redirect = () => {
  let video_end_time = moment() - this.state.video_start_time;
  const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
  let current = jeetomoneydata.jeetomoney.currentQuestion;
  let number_of_questions = jeetomoneydata.jeetomoney.numberOfQuestions;
  if(this.props.video.masterPlayerGameAccountDetails != undefined){
     AccountBalance = this.props.video.masterPlayerGameAccountDetails.total_account_balance
  }else{
     AccountBalance =  jeetomoneydata.jeetomoney.total_account_balance
  }
  if(current + 1 > number_of_questions){

            let jeetomoney12345 = {
                                     userdata: jeetomoneydata.jeetomoney.userdata,
                                     metadata: jeetomoneydata.jeetomoney.metadata,
                                     no_of_videos: jeetomoneydata.jeetomoney.no_of_videos,
                                     quizPayload: jeetomoneydata.jeetomoney.quizPayload,
                                     numberOfQuestions: jeetomoneydata.jeetomoney.numberOfQuestions,
                                     quizStatusPayload: jeetomoneydata.jeetomoney.quizStatusPayload,
                                     fullQuestionArray: jeetomoneydata.jeetomoney.fullQuestionArray,
                                     current_video: jeetomoneydata.jeetomoney.current_video + 1,
                                     fullQuestionArray: jeetomoneydata.jeetomoney.fullQuestionArray,
                                     time_taken_for_score: jeetomoneydata.jeetomoney.time_taken_for_score,
                                     overall_time_taken: jeetomoneydata.jeetomoney.overall_time_taken + video_end_time,
                                     time_taken_to_watch_videos: jeetomoneydata.jeetomoney.time_taken_to_watch_videos + video_end_time,
                                     number_of_questions_answered: jeetomoneydata.jeetomoney.number_of_questions_answered,
                                     number_of_questions_to_answer_per_video: jeetomoneydata.jeetomoney.number_of_questions_to_answer_per_video,
                                     number_of_questions: jeetomoneydata.jeetomoney.number_of_questions,
                                     currentQuestion: 1,
                                     score: jeetomoneydata.jeetomoney.score,
                                     total_account_balance: AccountBalance
                                  };
            reactLocalStorage.setObject('jeetomoneydataweb', {'jeetomoney': jeetomoney12345});

  }else{
          let jeetomoney12345 = {
                                   userdata: jeetomoneydata.jeetomoney.userdata,
                                   metadata: jeetomoneydata.jeetomoney.metadata,
                                   no_of_videos: jeetomoneydata.jeetomoney.no_of_videos,
                                   quizPayload: jeetomoneydata.jeetomoney.quizPayload,
                                   numberOfQuestions: jeetomoneydata.jeetomoney.numberOfQuestions,
                                   quizStatusPayload: jeetomoneydata.jeetomoney.quizStatusPayload,
                                   fullQuestionArray: jeetomoneydata.jeetomoney.fullQuestionArray,
                                   current_video: jeetomoneydata.jeetomoney.current_video + 1,
                                   fullQuestionArray: jeetomoneydata.jeetomoney.fullQuestionArray,
                                   time_taken_for_score: jeetomoneydata.jeetomoney.time_taken_for_score,
                                   overall_time_taken: jeetomoneydata.jeetomoney.overall_time_taken + video_end_time,
                                   time_taken_to_watch_videos: jeetomoneydata.jeetomoney.time_taken_to_watch_videos + video_end_time,
                                   number_of_questions_answered: jeetomoneydata.jeetomoney.number_of_questions_answered,
                                   number_of_questions_to_answer_per_video: jeetomoneydata.jeetomoney.number_of_questions_to_answer_per_video,
                                   number_of_questions: jeetomoneydata.jeetomoney.number_of_questions,
                                   currentQuestion: jeetomoneydata.jeetomoney.currentQuestion,
                                   score: jeetomoneydata.jeetomoney.score,
                                   total_account_balance: AccountBalance
                                  };
          reactLocalStorage.setObject('jeetomoneydataweb', {'jeetomoney': jeetomoney12345});

  }

  Router.browserHistory.push('/GameScreen');
}

  render () {
    const video = this.props.video;
    return (
      <div className='videoPlayerScreenWrapper'>
          <div className='videoPlayerScreenTopView'>
            <PopupLogo />
            <div className='videoPlayerScreenTimer'>
              <div className = 'videoTimer'>
              ({this.state.video_fetched}) ? <ProgressCircle
                                              status = {this.state.percent}
                                              label = {this.state.timer}
                                              backgroundColor="#01b30f"
                                              color="rgba(255,0,0,1)"
                                              labelColor="#000000"/>
              </div>
            </div>
          </div>
          <div className='videoPlayerScreenBottomView'>
            <ReactPlayer url = {video.video_link}
                        playing = {true}
                        height = {'100%'}
                        width = {'100%'}
                        onDuration = {this.duration}
                        onStart = {this.duration}
                        onEnded = {this.redirect}

              />
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    video: state.quiz
  }
}
export default connect(mapStateToProps, null) (VideoPlayerScreen);
