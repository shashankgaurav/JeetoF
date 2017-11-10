import React, { Component } from 'react';
import '../Stylesheets/gameScreen.css';
import Header from '../Components/header.js';
import Score from '../Components/gameScoreBoard.js';
import QuestionPanel from '../Components/questionOption.js';
import PayTablePopup from '../Components/payTablePopup.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import questionNBackground from '../Images/questionNBackground.png'
import white from '../Images/white-min-min.png';
import transparent from '../Images/transparent_patch_small.png';
import scorePlate from '../Images/scorePlate.png';
import green from '../Images/Green-min-min.png';
import red from '../Images/Red-min-min.png';
let thisRef = ''
class gameScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      fullQuestionArray: [],
      currentQuestion: 1,
      response: 0,
      correctAnswer:0
    }
    thisRef = this
  }

  questionListView () {
    console.log(this.state.fullQuestionArray);
      return (
        <div className="questionListContainer">
          <img src={questionNBackground} className="questionList" />
          <div className = "scoreBoardContainer">
            {this.state.fullQuestionArray.map((q, index) => (
              <div className = "selectedQuestionContainer">
                  <div className = "questionNTextContainer">
                    <div className = "questionNText">
                      <text >
                        {q.questionNo}
                      </text>
                    </div>
                    <div className = "questionStatus">
                      {console.log("Hello", q.questionNo, "Hello", this.state.currentQuestion)}
                      {(q.questionNo <= this.state.currentQuestion) ? <img src={q.status} className="statusImage" /> : null }
                    </div>
                  </div>
                  {(q.background !== transparent)?<img src = {q.background} className = "selectedQuestion" /> : null}
              </div>
            ))}
            </div>
        </div>
      )
    }

    sideBar = (response, correctAnswer, currentQues) => {
      let fullArray = [...this.state.fullQuestionArray];
      fullArray = fullArray.reverse();
      if (response === correctAnswer){
        fullArray[currentQues - 1].status = green;
        fullArray[currentQues - 1].background= transparent;
        (fullArray[currentQues] !== undefined) ? fullArray[currentQues].background= scorePlate : null;
        fullArray = fullArray.reverse();
        this.setState({fullQuestionArray: fullArray, currentQuestion: currentQues + 1}, () => {
          this.questionListView();
        })

      }else{

        fullArray[currentQues - 1].status = red;
        fullArray[currentQues - 1].background= transparent;
        (fullArray[currentQues] !== undefined) ? fullArray[currentQues].background= scorePlate : null;
        fullArray = fullArray.reverse();
        this.setState({fullQuestionArray: fullArray, currentQuestion: currentQues + 1}, () => {
        this.questionListView();
        })

      }
    }

    componentWillUnmount (){
      const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
      let jeetomoney12345 = {
                               userdata: jeetomoneydata.jeetomoney.userdata,
                               metadata: jeetomoneydata.jeetomoney.metadata,
                               no_of_videos: jeetomoneydata.jeetomoney.no_of_videos,
                               quizPayload: jeetomoneydata.jeetomoney.quizPayload,
                               numberOfQuestions: jeetomoneydata.jeetomoney.numberOfQuestions,
                               quizStatusPayload: jeetomoneydata.jeetomoney.quizStatusPayload,
                               fullQuestionArray: this.state.fullQuestionArray,
                               current_video: jeetomoneydata.jeetomoney.current_video,
                               time_taken_for_score: jeetomoneydata.jeetomoney.time_taken_for_score,
                               overall_time_taken: jeetomoneydata.jeetomoney.overall_time_taken,
                               time_taken_to_watch_videos: jeetomoneydata.jeetomoney.time_taken_to_watch_videos,
                               number_of_questions_answered: jeetomoneydata.jeetomoney.number_of_questions_answered,
                               number_of_questions_to_answer_per_video: jeetomoneydata.jeetomoney.number_of_questions_to_answer_per_video,
                               number_of_questions: jeetomoneydata.jeetomoney.number_of_questions,
                               currentQuestion: jeetomoneydata.jeetomoney.currentQuestion,
                               score: jeetomoneydata.jeetomoney.score
                             };

                             reactLocalStorage.setObject('jeetomoneydataweb', {'jeetomoney': jeetomoney12345});
                             console.log(jeetomoney12345);
    }

  componentWillMount(){
    const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
    const fullQuestionArray = jeetomoneydata.jeetomoney.fullQuestionArray;
    const currentQuestion = jeetomoneydata.jeetomoney.currentQuestion
    this.setState({fullQuestionArray: fullQuestionArray, currentQuestion: currentQuestion}, ()=> {
      console.log(this.state);

    });
  }

  render () {
    console.log("on game screen")


    return (
      <div className='gameScreen'>
        <div className='gameScreenheader'>
          <Header />
        </div>
        <div className='scoreBoard'>
          {this.questionListView()}
        </div>
        <div className='gameQuesionAnswerPanel'>
          <QuestionPanel sidebar = {this.sideBar}/>
        </div>
      </div>
    )
  }
}
export default gameScreen;
