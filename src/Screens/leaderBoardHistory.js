import React, { Component } from 'react'
import '../Stylesheets/leaderBoardHistory.css'
import leaderBoard from '../Images/leaderboard.png'
import leaderBoardGray from '../Images/leaderboardGray.png'
import leaderBoardDisable from '../Images/leaderboard.png'
import LeaderBoardPopup from '../Components/leaderBoard.js'
import BackButton from '../Images/backbtn-min.png'
import {leaderboardAction} from '../Actions/leaderboardAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const Router = require('react-router')
// var scrollviewOffsetY = dom.scrollTop
// var scrollviewFrameHeight = dom.clientHeight
// var scrollviewContentHeight = dom.scrollHeight
// var sum = scrollviewOffsetY+scrollviewFrameHeight

let refThis = ''
class LeaderBoardHistory extends Component {
  constructor (props) {
   
    super(props)
    this.state = {
      showBoard: false
    }
    refThis = this
  }

  // isBottom(el) {
  //   console.log("is bottom")
  //   // console.log(el.getBoundingClientRect().bottom <= window.innerHeight);
  // }
  
  // componentDidMount() {
  //   document.addEventListener('scroll', this.trackScrolling);
  // }
  
  // trackScrolling = () => {
  //   // const wrappedElement = document.getElementById('recordHistoryPanel');
  //   console.log("recordHistoryPanel")
  //   // if (this.isBottom(wrappedElement)) {
  //   //   console.log('header bottom reached');
  //   //   document.removeEventListener('scroll', this.trackScrolling);
  //   // }
  // };

  componentDidMount = () =>{
    // console.log("componentDidMount")
    // window.addEventListener('scroll', this.trackScrolling);
    this.props.leaderboardAction();
  }

  componentWillReciveProps = () => {
    console.log("hello shital");
  }
  
  showLeaderBoard (item) {
    // console.log("jhfgdkjfg");
    refThis.setState({ showBoard: true })

  }

  redirectBack () {
    Router.browserHistory.push('/HomeScreen')
  }

  showLeaderboardDetails(rowData)
  {
    refThis.setState({ showBoard: true })
    this.renderLeaderBoard();
  }
  
  renderLeaderBoard (rowData) {
    refThis.setState({ showBoard: true })
    refThis.setState({ rowDetails:rowData})
  }

   render () {
    let rowData = this.props.responseLeaderboard.rows;
    let leaderboardRecords = 0;
    
    if(this.props.responseLeaderboard.length==0)
    {
      // console.log("not in map function");
    }else
    {
      leaderboardRecords = rowData.map((item, i)=>{
        // console.log("map fuction");
        return(
        <div className='leaderBoardHistoryPanelRow' id="recordHistoryPanel">
                  <div className='leaderBoardHistoryRowLeft'>
                    <div className='headerCol'>{new Date(item.completed_at).toLocaleDateString()}</div>
                    <div className='headerCol'>{item.masterRoomType.refPlayMode.play_mode_name}</div>
                    <div className='headerCol'>Rs.<span>{item.masterRoomType.entry_fee_in_Rs}</span></div>
                    <div className='headerCol'>
                      {item.opsRoomParticipant != null ? 'Declared' : 'Pending'} 
                    </div>
                    <div className='headerCol'>
                      Rs.<span>{item.opsRoomParticipant != null ? item.opsRoomParticipant.winning_amount : ''}</span>
                    </div>
                  </div>
                  <div
                     className='leaderBoardHistoryRowRight'
                     onClick={() => this.renderLeaderBoard(item)}
                   >
                    <img
                      src={item.opsRoomParticipant != null ?  leaderBoard: leaderBoardGray}
                      className='img img-responsive leaderBoardImage'
                    />
                  </div>
        </div>
      )})
    }


    // if(this.props.responseLeaderboard !== []) { console.log(this.props.responseLeaderboard) }
    return (
      <div className='leaderBoardHistoryWrapper'>
        {/* {this.renderLeaderBoard()} */}
        <div className='leaderBoardPanel'>
          <div className='leaderBoardHistoryHeader' />
          <div className='leaderBoardHistoryData'>
            <div className='leaderBoardHistoryPanelHeader'>
              <div className='leaderBoardHistoryRowLeft'>
                <div className='headerCol'>Date</div>
                <div className='headerCol'>Play Mode</div>
                <div className='headerCol'>Entry Fee</div>
                <div className='headerCol'>Result Status</div>
                <div className='headerCol'>Winning Amount</div>
              </div>
              <div className='leaderBoardHistoryRowRight' />
            </div>
            <div className='leaderBoardHistoryPanelData'>
              {leaderboardRecords}
            </div>
          </div>
          <div className='leaderBoardHistoryFooter' onClick={this.redirectBack}>
            <img src={BackButton} className='img img-responsive backArrow' />
          </div>
        </div>
          {(this.state.showBoard) ? <LeaderBoardPopup details={this.state.rowDetails} onPress={() => refThis.setState({ showBoard: false })}/> : null}
        {/* <BottomScrollListener onbottom={callback} /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    responseLeaderboard: state.leaderboard
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    ...bindActionCreators({leaderboardAction}, dispatch)
  }
}

//export default LeaderBoardHistory
export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardHistory);

