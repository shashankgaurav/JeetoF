import React, { Component } from 'react';
import {API_URL} from '../constants';
import '../Stylesheets/questionOption.css';
import Button from '../Components/answerButton.js';
import GameScreenButton from "../Components/gameScreenButton"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getQuizAction } from '../Actions/getQuizDetailsActions';
import { reactLocalStorage } from 'reactjs-localstorage';
import moment from 'moment';
import { submitQuizAction } from '../Actions/submitQuizAction';
import ProgressCircle from 'react-progress-circle';
import regularButton from '../Images/regularButton.png'
import selectButton from '../Images/selectButton.png'
import correctButton from '../Images/correctAnswer.png'
import wrongButton from '../Images/wrongButton.png'
import { read_cookie, bake_cookie } from 'sfcookies';

const Router = require('react-router');
let cookeiesdata;
let percentInc = Math.round(1 / 30 * 10 * 100) / 10;
const _ = require('lodash');
// let array = [regularButton, regularButton, regularButton, regularButton];
class questionOption extends Component {
  constructor (props) {
    super(props);

    this.state = {
      question_number: 0,
      video: 1,
      total_questions: 0,
      timer: 30,
      isGameStatusUpdated: false,
      isDisabled: false,
      questionStartTime: moment(),
      answer_time: 0,
      score: 0,
      percent: 0,
      arr: [regularButton, regularButton, regularButton, regularButton],
      fullQuestionArray: [],
      questionBlock: [
                {
                  master_questions_id: 0,
                  user_selected_answer_option: 0,
                  is_correct_answer_option_selected: false,
                  time_take_to_answer_the_question: 0
                },
                {
                  master_questions_id: 0,
                  user_selected_answer_option: 0,
                  is_correct_answer_option_selected: false,
                  time_take_to_answer_the_question: 0
                },
                {
                  master_questions_id: 0,
                  user_selected_answer_option: 0,
                  is_correct_answer_option_selected: false,
                  time_take_to_answer_the_question: 0
                }
        ],
      submitFlag: false
    }
  }

componentWillUnmount() {
  clearInterval(this.timer);
  clearTimeout(this.nqt);
}

componentDidMount() {
  clearInterval(this.timer);
  this.setState({isGameStatusUpdated: false });
  this.timer = setInterval(this.questionTimer, 1000);
}

componentWillMount(){
  cookeiesdata = read_cookie('cookeiesdata');

  cookeiesdata = read_cookie('cookeiesdata');
  console.log("cookeiesdata", cookeiesdata);

  clearInterval(this.timer);
  clearTimeout(this.nqt);
  clearTimeout(this.nqv);
}


  questionTimer = () => {
    if (this.state.timer > 0) {
      let x = _.round(parseInt(this.state.timer) - 1, 1);
      this.setState({timer: x,percent: this.state.percent + percentInc})
    } else {
      clearInterval(this.timer);
      this.nqt = setTimeout(this.nextQuestionTimer, 100, 0, 30, 2)
    }
  }

  //next question timer: if the quiz is not complete then retrive next question.
  nextQuestionTimer = (answerSelected, timeTakenToAnswerQues, animationStage) => {

    let correctAnswer = this.props.questions.questions[this.state.question_number].correct_answer_option_number;
    let array = [...this.state.arr];
    clearInterval(this.timer);
    clearTimeout(this.nqt);
    let timeout = 150;
    if (correctAnswer !== answerSelected && answerSelected != 0) {
      array[answerSelected-1] = wrongButton
    }
    //step 2 show correct answer - 150ms
    if (animationStage === 2) {
        array[correctAnswer-1] = correctButton;
          //step 3 show blank answer - 150ms
    } else if (animationStage === 3){
        array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
          //step 4 show correct answer - 150ms
    } else if (animationStage === 4) {
          array[correctAnswer-1] = correctButton;
          //step 5 show blank answer - 150ms
    } else if (animationStage === 5) {
          array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
          //step 6 show correct answer - 150ms
    } else if (animationStage === 6) {
          array[correctAnswer-1] = correctButton;
          //step 7 show blank answer - 150ms
    } else if (animationStage === 7) {
          array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
          //step 8 show correct answer - 150ms
    } else if (animationStage === 8) {
         array[correctAnswer-1] = correctButton;
         //step 9 show blank answer - 150ms
    } else if (animationStage === 9) {
         array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
        //step 10 show correct answer - 150ms
    } else if (animationStage === 10) {
        array[correctAnswer-1] = correctButton;
        //step 11 show blank answer - 150ms
    } else if (animationStage === 11) {
        array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
        //step 12 show correct answer - 150ms
    } else if (animationStage === 12) {
       array[correctAnswer-1] = correctButton;
       //step 13 show blank answer - 150ms
    } else if (animationStage === 13) {
       array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
       //step 14 show correct answer - 150ms
    } else if (animationStage === 14) {
        array[correctAnswer-1] = correctButton;
      //step 15 show blank answer - 150ms
    } else if (animationStage === 15) {
      array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
      //step 16 show correct answer - 150ms
    } else if (animationStage === 16) {
      array[correctAnswer-1] = correctButton;
      //step 17 show blank answer - 150ms
    } else if (animationStage === 17) {
      array[correctAnswer-1] = (correctAnswer !== answerSelected) ? regularButton : selectButton;
      //step 18 show correct answer - 150ms
    } else if (animationStage === 18) {
      timeout = 2000;
      array[correctAnswer-1] = correctButton;
      //step 17 show blank answer - 150ms
    } else if (animationStage === 19) {
          timeout = 0;
          clearInterval(this.timer);
          clearTimeout(this.nqt);
          array[correctAnswer-1] = correctButton;
    }
        this.setState({arr: array});
        animationStage++;
        if (timeout !== 0) {
            this.nqt = this.nqt = setTimeout(this.nextQuestionTimer, timeout, answerSelected, timeTakenToAnswerQues, animationStage);
        }else{
                clearInterval(this.timer);
                const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
                const currentQuestion = jeetomoneydata.jeetomoney.currentQuestion;
                this.props.sidebar(answerSelected, correctAnswer, currentQuestion);
                let questionBlock = [...this.state.questionBlock];
                let questions = this.props.questions;
                questionBlock[this.state.question_number].master_questions_id = questions.questions[this.state.question_number].master_questions_id;
                questionBlock[this.state.question_number].user_selected_answer_option = answerSelected;
                questionBlock[this.state.question_number].time_take_to_answer_the_question = timeTakenToAnswerQues;

                if(answerSelected === correctAnswer){
                  questionBlock[this.state.question_number].is_correct_answer_option_selected = true;
                  let jeetomoney12345 = {
                                           userdata: jeetomoneydata.jeetomoney.userdata,
                                           metadata: jeetomoneydata.jeetomoney.metadata,
                                           no_of_videos: jeetomoneydata.jeetomoney.no_of_videos,
                                           quizPayload: jeetomoneydata.jeetomoney.quizPayload,
                                           numberOfQuestions: jeetomoneydata.jeetomoney.numberOfQuestions,
                                           quizStatusPayload: jeetomoneydata.jeetomoney.quizStatusPayload,
                                           fullQuestionArray: jeetomoneydata.jeetomoney.fullQuestionArray,
                                           current_video: jeetomoneydata.jeetomoney.current_video,
                                           time_taken_for_score: jeetomoneydata.jeetomoney.time_taken_for_score + timeTakenToAnswerQues,
                                           overall_time_taken: jeetomoneydata.jeetomoney.overall_time_taken + timeTakenToAnswerQues,
                                           time_taken_to_watch_videos: jeetomoneydata.jeetomoney.time_taken_to_watch_videos,
                                           number_of_questions_answered: jeetomoneydata.jeetomoney.number_of_questions_answered,
                                           number_of_questions_to_answer_per_video: jeetomoneydata.jeetomoney.number_of_questions_to_answer_per_video,
                                           number_of_questions: jeetomoneydata.jeetomoney.number_of_questions,
                                           currentQuestion: jeetomoneydata.jeetomoney.currentQuestion + 1,
                                           score: jeetomoneydata.jeetomoney.score + 1,
                                           total_account_balance: jeetomoneydata.jeetomoney.total_account_balance

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
                                                  current_video: jeetomoneydata.jeetomoney.current_video,
                                                  time_taken_for_score: jeetomoneydata.jeetomoney.time_taken_for_score + timeTakenToAnswerQues,
                                                  overall_time_taken: jeetomoneydata.jeetomoney.overall_time_taken + timeTakenToAnswerQues,
                                                  time_taken_to_watch_videos: jeetomoneydata.jeetomoney.time_taken_to_watch_videos,
                                                  number_of_questions_answered: jeetomoneydata.jeetomoney.number_of_questions_answered,
                                                  number_of_questions_to_answer_per_video: jeetomoneydata.jeetomoney.number_of_questions_to_answer_per_video,
                                                  number_of_questions: jeetomoneydata.jeetomoney.number_of_questions,
                                                  currentQuestion: jeetomoneydata.jeetomoney.currentQuestion + 1,
                                                  score: jeetomoneydata.jeetomoney.score,
                                                  total_account_balance: jeetomoneydata.jeetomoney.total_account_balance

                                              };

                        reactLocalStorage.setObject('jeetomoneydataweb', {'jeetomoney': jeetomoney12345});
                   }
                   this.setState({questionBlock: questionBlock});

                    if(this.state.question_number < 2){
                        let array = [regularButton, regularButton, regularButton, regularButton];
                        this.setState({question_number: this.state.question_number + 1, percent: 0, arr: array, timer: 30});
                        clearInterval(this.timer);
                        clearTimeout(this.nqt);
                        this.timer = setInterval(this.questionTimer, 1000);
                        // this.setState({percent: 0, arr: array, timer: 30});
                    }else{
                            let questions = this.props.questions;
                            const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
                            const overall_time_taken = jeetomoneydata.jeetomoney.overall_time_taken;
                            const time_taken_to_watch_videos = jeetomoneydata.jeetomoney.time_taken_to_watch_videos;
                            const time_taken_for_score = jeetomoneydata.jeetomoney.time_taken_for_score;
                            const score = jeetomoneydata.jeetomoney.score;
                            const no_of_questions = jeetomoneydata.jeetomoney.number_of_questions;


                            let answerObj = {}
                              answerObj.master_videos_id= parseInt(questions.master_videos_id);
                              answerObj.ref_video_categories_id= parseInt(questions.ref_video_categories_id);
                              answerObj.master_content_partners_id= parseInt(questions.master_content_partners_id);
                              answerObj.ref_languages_id= parseInt(questions.ref_languages_id);
                              answerObj.target_age_range= questions.target_age_range;
                              answerObj.is_active = true;
                              answerObj.is_completed = (jeetomoneydata.jeetomoney.currentQuestion < no_of_questions ) ? false : true;
                              answerObj.overall_time_taken = overall_time_taken;
                              answerObj.time_taken_to_watch_videos = time_taken_to_watch_videos;
                              answerObj.time_taken_for_score = time_taken_for_score;
                              answerObj.score = score;
                              answerObj.questions = this.state.questionBlock;
                              answerObj.ops_game_play_records_id = questions.quizDetails.ops_game_play_records_id;
                              this.setState({ submitFlag: true })
                              let submit_quiz_url = API_URL + 'v1/quiz/' + answerObj.ops_game_play_records_id;
                              this.props.submitQuizAction(submit_quiz_url, answerObj);
                              clearInterval(this.timer)
                              console.log("jeetomoneydata.jeetomoney.current_video", jeetomoneydata.jeetomoney.current_video, "jeetomoneydata.jeetomoney.no_of_videos", jeetomoneydata.jeetomoney.no_of_videos);
                              if(jeetomoneydata.jeetomoney.current_video < jeetomoneydata.jeetomoney.no_of_videos){

                                    let quiz_url = API_URL+'/v1/getVideoForQuiz/' + jeetomoneydata.jeetomoney.quizPayload.playerId + '/language/1/quizID/' +  this.props.questions.quizDetails.ops_game_play_records_id  + '/roomType/' + jeetomoneydata.jeetomoney.quizPayload.roomType;
                                    this.props.getQuizAction(quiz_url);
                                    this.setState({question_number: 0});
                                    Router.browserHistory.push('/VideoPlayerScreen');

                              } else if(cookeiesdata.userdetailsStore.Stage == 1){
                                  cookeiesdata.userdetailsStore.Stage = 2;
                                  let  userdetailsStore = {
                                     master_players_id: cookeiesdata.userdetailsStore.master_players_id,
                                     is_phone_verified: cookeiesdata.userdetailsStore.is_phone_verified,
                                     firstUserExperience: cookeiesdata.userdetailsStore.firstUserExperience,
                                     Stage: cookeiesdata.userdetailsStore.Stage,
                                     header: cookeiesdata.userdetailsStore.header
                                   }
                                   bake_cookie('cookeiesdata', {userdetailsStore});
                                   Router.browserHistory.push('/FTUPlayNow');

                              }else if (cookeiesdata.userdetailsStore.Stage == 2){

                                let  userdetailsStore = {
                                   master_players_id: cookeiesdata.userdetailsStore.master_players_id,
                                   is_phone_verified: cookeiesdata.userdetailsStore.is_phone_verified,
                                   firstUserExperience: false,
                                   Stage: 0,
                                   header: cookeiesdata.userdetailsStore.header
                                 }
                                 bake_cookie('cookeiesdata', {userdetailsStore});
                                 Router.browserHistory.push('/FTURefferalCode');
                              }else{
                                    Router.browserHistory.push('/EndOfPlay');
                            }
                    }


                }
            }


handleClick = (response) => {
      this.setState({isDisabled: true})
      let time_taken_to_answer = moment() - this.state.questionStartTime;
      let array = [...this.state.arr];
      clearInterval(this.timer);
      array[response - 1] = selectButton;
      this.setState({arr: array});
      this.nqt = setTimeout(this.nextQuestionTimer, 2000, response, time_taken_to_answer, 2);

}



  render() {

    let question = this.props.questions;
    const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
    // const fullQuestionArray = jeetomoneydata.jeetomoney.fullQuestionArray;
    // this.setState({fullQuestionArray: fullQuestionArray});
    const questionText = <div className="questionDiv">
                            <div className="timer_div col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <ProgressCircle
                                status = {this.state.percent}
                                label = {this.state.timer}
                                backgroundColor="#01b30f"
                                color="#ff0000"
                                labelColor="#000000"/>
                            </div>

                            <div className="question col-lg-10 col-md-10 col-sm-10 col-xs-10">
                              {question.questions[this.state.question_number].question_text}
                            </div>
                          </div>;

    const option1 = <div className="optionDiv ">
                      <div className="optionIndex col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        A:
                      </div>

                      <div className="optionText col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        {question.questions[this.state.question_number].answer_option_1_text}
                      </div>
                    </div>;

    const option2 = <div className="optionDiv ">
                      <div className="optionIndex col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        B:
                      </div>

                      <div className="optionText col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        {question.questions[this.state.question_number].answer_option_2_text}
                      </div>
                    </div>;

    const option3 = <div className="optionDiv">
                      <div className="optionIndex col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        C:
                      </div>

                      <div className="optionText col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        {question.questions[this.state.question_number].answer_option_3_text}
                      </div>
                    </div>;

    const option4 = <div className="optionDiv ">
                      <div className="optionIndex col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        D:
                      </div>

                      <div className="optionText col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        {question.questions[this.state.question_number].answer_option_4_text}
                      </div>
                    </div>;

          return (
            <div className='questionOptionPanel'>

              <div className = 'questionText'>
                <Button name = {questionText}/>
              </div>
              <div className = 'optionPanel'>
               <div className = 'option' id = {1} onClick = {() => {this.handleClick(1)}}>
                  <GameScreenButton buttonImg = {this.state.arr[0]} buttonContent={option1} disabled = {this.state.isDisabled}/>
                </div>
                <div className='option' id = {2} onClick = {() => {this.handleClick(2)}}>
                  <GameScreenButton buttonImg = {this.state.arr[1]} buttonContent={option2} disabled = {this.state.isDisabled}/>
                </div>
                <div className='option' id = {3} onClick = {() => {this.handleClick(3)}}>
                  <GameScreenButton buttonImg = {this.state.arr[2]} buttonContent={option3} disabled = {this.state.isDisabled}/>
                </div>
                <div className='option' id = {4} onClick = {() => {this.handleClick(4)}}>
                  <GameScreenButton buttonImg = {this.state.arr[3]} buttonContent={option4} disabled = {this.state.isDisabled}/>
                </div>
            </div>
          </div>
        )
      }
  }


const mapStateToProps = (state) => {
  return{
  questions: state.quiz
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    ...bindActionCreators({getQuizAction, submitQuizAction} ,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (questionOption)
