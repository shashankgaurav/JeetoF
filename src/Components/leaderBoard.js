import React, { Component } from 'react'
import '../Stylesheets/leaderBoard.css'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import closeicon from '../Images/closeicon.png'
import { reactLocalStorage } from 'reactjs-localstorage'
import moment from 'moment'
let quizResultDetails
let leaderBoardResultDetails
let thisRef = ''
let loggedInUserDetails
let winning_amount = 0
let timeTaken
let metaDataDetails
let a = ''
let sliderRecords
let commonHeader
let leaderboardAPIResponse
let leaderboardAllRecords
const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
console.log(jeetomoneydata)

class leaderBoard extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { showBoard: false }
    thisRef.state = {
      currentResultId: this.props.details.ops_game_play_records_id
    }
  }

  componentWillMount = () => {
    metaDataDetails = jeetomoneydata.jeetomoney.metadata
    leaderboardAPIResponse = jeetomoneydata.jeetomoney.leaderboardAPIResponse
    loggedInUserDetails = jeetomoneydata.jeetomoney.userdata
    leaderboardAllRecords =
      jeetomoneydata.jeetomoney.leaderboardAPIResponse.rows
  }

  displayWiningAmount (rank, quizResultDetails) {
    metaDataDetails.roomConfig[0].roomType.map((obj, i) => {
      if (obj.master_room_types_id == quizResultDetails.master_room_types_id) {
        obj.payTable.map((newObj, j) => {
          if (j == rank - 1) {
            a = obj.entry_fee_in_Rs + ' ka ' + newObj.winning_amount
          }
        })
      }
    })
    return a
  }

  dynamicView (position, quizResultDetails) {
    if (quizResultDetails.opsRoomParticipant != null) {
      timeTaken = ''
    } else {
      timeTaken = quizResultDetails.opsRoomParticipant.time_taken / 1000
    }
    if (
      quizResultDetails.master_players_id ==
        loggedInUserDetails.master_players_id &&
      position == quizResultDetails.opsRoomParticipant.rank_number
    ) {
      return (
        <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 winnerTab'>
          <div className='leaderUserName'>
            {loggedInUserDetails.firstName.charAt(0) +
              ' ' +
              loggedInUserDetails.lastName}
            {' '}
          </div>
          {metaDataDetails.roomConfig[0].roomType.map((obj, i) => {
            if (
              obj.master_room_types_id ==
              quizResultDetails.opsRoomParticipant.opsRoom.master_room_types_id
            ) {
              return (
                <div className='leaderWiningScore'>
                  {quizResultDetails.score +
                    '/' +
                    obj.number_of_videos_to_be_shown *
                      obj.number_of_questions_to_answer_per_video}
                </div>
              )
            }
          })}
          <div className='leaderUseTime'>{timeTaken} miliSec</div>
        </div>
      )
    }
  }

  winnerDetails () {
    return (
      <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 winnerTab'>
        <div className='leaderUserName'>{loggedInUserDetails.firstName}</div>
        <div className='leaderWiningScore'>
          {this.props.details.opsRoomParticipant.score}
        </div>
        <div className='leaderUseTime'>
          {this.props.details.opsRoomParticipant.time_taken}
        </div>
      </div>
    )
  }

  onClick (e) {
    e.preventDefault()
    thisRef.setState({ showBoard: !thisRef.state.showBoard })
  }

  showResultDetails (quizResultDetails) {
    commonHeader = (
      <div className='leaderBoardHeader'>
        <div className='leaderBoardButtonPanel'>
          <div className='entryFee col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <div className='entryFeeText'>
              ₹
              {' '}
              <span className=''>
                {quizResultDetails.masterRoomType.entry_fee_in_Rs}
              </span>
            </div>
          </div>
          <div className='roomType col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <div className='roomTypeText'>
              {quizResultDetails.masterRoomType.refPlayMode.play_mode_name}
            </div>
          </div>
        </div>
        <div className='completedOn'>
          Completed On: <span>
            {moment(quizResultDetails.completed_at).format(
              'Do MMMM YYYY, h:mm a'
            )}
          </span>
        </div>
      </div>
    )

    if (quizResultDetails.opsRoomParticipant != null) {
      if (quizResultDetails.masterRoomType.is_jackpot == true) {
        if (quizResultDetails.masterRoomType.is_winner == true) {
          leaderBoardResultDetails = (
            <div>
              {commonHeader}
              <div className='leaderBoardSliderData'>
                <div className='jackpotType' />
                <div className='leaderBoardjackPot'>
                  <div className='innerjackpotWrapper'>
                    <div className='jackpotAmount'>
                      {quizResultDetails.opsRoomParticipant.winning_amount}
                    </div>
                    <div className='jackpotWinner'>
                      {loggedInUserDetails.firstName +
                        loggedInUserDetails.lastName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          leaderBoardResultDetails = (
            <div>
              {commonHeader}
              <div className='leaderBoardSliderData'>
                <div className='jackpotType' />
                <div className='leaderBoardjackPot'>
                  <div className='innerjackpotWrapper'>
                    <div className='jackpotAmount'>
                      {quizResultDetails.opsRoomParticipant.winning_amount}
                    </div>
                    <div className='jackpotWinner'>John Carter</div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      } else {
        if (quizResultDetails.masterRoomType.number_of_players == 2) {
          leaderBoardResultDetails = (
            <div>
              {commonHeader}
              <div className='leaderBoardSliderData'>
                <div className='leaderBoardDataRow leaderBoardDataTab1 row'>
                  <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 winingCount'>
                    {this.displayWiningAmount(1, quizResultDetails)}
                  </div>
                  {this.dynamicView(1, quizResultDetails)}
                </div>
                <div className='leaderBoardDataRow row leaderBoardDataTab4'>
                  <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 winingCount'>
                    {this.displayWiningAmount(2, quizResultDetails)}
                  </div>
                  {this.dynamicView(2, quizResultDetails)}
                  {this.dynamicView(3, quizResultDetails)}
                  {this.dynamicView(4, quizResultDetails)}
                  {this.dynamicView(5, quizResultDetails)}
                  {this.dynamicView(6, quizResultDetails)}
                </div>
              </div>
            </div>
          )
        } else if (quizResultDetails.masterRoomType.number_of_players == 6) {
          leaderBoardResultDetails = (
            <div>
              {commonHeader}
              <div className='leaderBoardSliderData'>
                <div className='leaderBoardDataRow leaderBoardDataTab1 row'>
                  <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 winingCount'>
                    {this.displayWiningAmount(1, quizResultDetails)}
                  </div>
                  {this.dynamicView(1, quizResultDetails)}
                </div>
                <div className='leaderBoardDataRow row leaderBoardDataTab4'>
                  <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 winingCount'>
                    {this.displayWiningAmount(2, quizResultDetails)}
                  </div>
                  {this.dynamicView(2, quizResultDetails)}
                </div>
                <div className='leaderBoardDataRow row leaderBoardDataTab4'>
                  <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 winingCount'>
                    {this.displayWiningAmount(3, quizResultDetails)}
                  </div>
                  {this.dynamicView(3, quizResultDetails)}
                </div>
                <div className='leaderBoardDataRow row leaderBoardDataTab4'>
                  <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 winingCount'>
                    {this.displayWiningAmount(4, quizResultDetails)}
                  </div>
                  {this.dynamicView(4, quizResultDetails)}
                  {this.dynamicView(5, quizResultDetails)}
                  {this.dynamicView(6, quizResultDetails)}
                </div>
              </div>
            </div>
          )
        }
      }
    } else {
      leaderBoardResultDetails = (
        <div>
          {/* <div className='closeBoard' onClick={thisRef.props.onPress} /> */}
          {commonHeader}
          <div className='leaderBoardSliderData'>
            <text className='resultNotDeclared'>
              Sorry Results are not Declared
            </text>
          </div>
        </div>
      )
    }
    return leaderBoardResultDetails
  }

  render () {
    sliderRecords = leaderboardAllRecords.map((item, i) => {
      return <Slide index={i}>{this.showResultDetails(item)}</Slide>
    })

    return (
      <div className='leaderBoardWrapper'>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={leaderboardAllRecords.length}
        >
          <div className='carouselButtons'>
            <ButtonBack />
            <ButtonNext />
          </div>
          <Slider>
            {sliderRecords}
          </Slider>
        </CarouselProvider>
        <div className='shareData' />
      </div>
    )
  }
}
export default leaderBoard
