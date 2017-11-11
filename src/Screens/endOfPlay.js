import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../Stylesheets/endOfPlay.css';
import Button from '../Components/answerButton';
import endOfPlayCongratulationImage from '../Images/endOfPlayCongratulation.png';
import EndOfPlayOtherRoomBtn from '../Images/endOfPlayOtherRoomBtn.png';
import EndOfPlayAgainBtn from '../Images/endOfPlayAgainBtn.png';
import { reactLocalStorage } from 'reactjs-localstorage';
import { getQuizAction } from '../Actions/getQuizDetailsActions';
import white from '../Images/white-min-min.png';
import transparent from '../Images/transparent_patch_small.png';
import scorePlate from '../Images/scorePlate.png';
import { API_URL } from '../constants';
const Router = require('react-router');

class EndOfPlay extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quizId: 0
    }
  }

handlePlay = () => {
                      const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
                      const numberOfQuestions = jeetomoneydata.jeetomoney.numberOfQuestions;
                      const currentBalance = jeetomoneydata.jeetomoney.total_account_balance;
                      const updatedBalance = (jeetomoneydata.jeetomoney.total_account_balance) - (this.props.room)
                      console.log(jeetomoneydata,currentBalance, updatedBalance);
                    // if(currentBalance > this.props.room){
                              let quiz_url = API_URL+'/v1/getVideoForQuiz/' + jeetomoneydata.jeetomoney.quizPayload.playerId + '/language/1/quizID/' +  this.state.quizId  + '/roomType/' + jeetomoneydata.jeetomoney.quizPayload.roomType;
                              let fullQuestionArray = [];
                              for(let i = 0; i < numberOfQuestions; i++) {
                                       fullQuestionArray.push({"questionNo": i+1, "status":white, "background": transparent  })
                                     }
                              fullQuestionArray = fullQuestionArray.reverse();
                              fullQuestionArray[numberOfQuestions-1].background = scorePlate;
                              let jeetomoney12345 = {
                                                       userdata: jeetomoneydata.jeetomoney.userdata,
                                                       metadata: jeetomoneydata.jeetomoney.metadata,
                                                       no_of_videos: jeetomoneydata.jeetomoney.no_of_videos,
                                                       quizPayload: jeetomoneydata.jeetomoney.quizPayload,
                                                       numberOfQuestions: jeetomoneydata.jeetomoney.numberOfQuestions,
                                                       quizStatusPayload: jeetomoneydata.jeetomoney.quizStatusPayload,
                                                       fullQuestionArray: fullQuestionArray,
                                                       current_video: 0,
                                                       time_taken_for_score: 0,
                                                       overall_time_taken: 0,
                                                       time_taken_to_watch_videos: 0,
                                                       number_of_questions_answered: 0,
                                                       number_of_questions_to_answer_per_video: jeetomoneydata.jeetomoney.number_of_questions_to_answer_per_video,
                                                       currentQuestion: 1,
                                                       score: 0,
                                                       total_account_balance: updatedBalance
                                                     };

                              reactLocalStorage.setObject('jeetomoneydataweb', {'jeetomoney': jeetomoney12345});
                              this.props.getQuizAction(quiz_url);
                              setTimeout(()=>{Router.browserHistory.push('/VideoPlayerScreen')}, 500)
                    // }else{
                    //           alert("You Don't have enough balance. Please add money to your account");
                    //           setTimeout(()=>{Router.browserHistory.push('/RoomSelectionScreen')}, 500)
                    // }

}

handleOther = () => {
    setTimeout(()=>{
      Router.browserHistory.push('/RoomSelectionScreen');
    }, 500)
}

  render () {
    return (
      <div className='endOfPlayWrapper'>
        <div className='endOfPlayMainView'>
          <div className='endOfPlayTopView'>
            <img
              src={endOfPlayCongratulationImage}
              className='endOfPlayImages img img-responsive'
            />
          </div>
          <div className='endOfPlayMiddleView'>
            <div>
              <text className='endOfPlayText'>
                You have complete the game.
              </text>
              <text className='endOfPlayText'>
                You will receive a notification once results are declared.
              </text>
            </div>
          </div>
          <div className='endOfPlayBottomView'>
            <div className='endOfPlayInnerBottomView'>
              <div className='endOfPlayInnerBottomMostLeftView' />
              <div className='endOfPlayInnerBottomLeftView' onClick = {this.handlePlay}>
                <img
                  src={EndOfPlayAgainBtn}
                  className='endOfPlayAgainImages img img-responsive'
                />
              </div>
              <div className='endOfPlayInnerBottomMiddleView' />
              <div className='endOfPlayInnerBottomRightView' onClick = {this.handleOther}>
                <img
                  src={EndOfPlayOtherRoomBtn}
                  className='endOfPlayAgainImages img img-responsive'
                />
              </div>
              <div className='endOfPlayInnerBottomMostRightView' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    room: state.room
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    ...bindActionCreators({getQuizAction},dispatch)
  }
}
export default connect(null, mapDispatchToProps) (EndOfPlay);
