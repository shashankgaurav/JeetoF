import React, { Component } from 'react'
import '../Stylesheets/payTablePopup.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import closeicon from '../Images/closeicon.png';
import { reactLocalStorage } from 'reactjs-localstorage';

const _ = require('lodash');
class PopUpBox extends Component {
  constructor (props) {
    super(props)
   this.state = { show: false }
  }
  onClick = (e) => {
    e.preventDefault()
    console.log('abcdefgh')
    //this.props.togglePopup();
  }

  render () {
    console.log(this.props);
    let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
    const  roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(this.props.payTable.row)}), ['is_jackpot'], ['asc'])
    const winning_amount = _.uniq(_.map((roomTypes[this.props.payTable.win].payTable), 'winning_amount'));
    console.log(roomTypes);
    const Lists = winning_amount.map((item, i) => {
      if(item !== 0){
       return (
         <div className='paytableRow row' key = {i}>
           <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailText'>
             Rank {i + 1} wins
           </div>
           <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailData'>
             {item}
           </div>
         </div>
    );
  } else {
    return null;
  }
  });
    return (
      <div className='popupContainer'>
        <div className='popupView'>
          <div className='paytableHeader' />
          <div className='paytableDetail'>
            <div className='paytableRow row'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailText'>
                Entry Fee Rs.
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailData'>
                {this.props.payTable.row}
              </div>
            </div>
            <div className='paytableRow row'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailText'>
                No Of Videos
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailData'>
                {this.props.payTable.numberOfVideos}
              </div>
            </div>
            <div className='paytableRow row'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailText'>
                <span>#</span>of Questions
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailData'>
                {this.props.payTable.numberOfQuestions}
              </div>
            </div>
            <div className='paytableRow row'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailText'>
                <span>#</span>of Players
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailData'>
                {this.props.payTable.numberOfPlayers}
              </div>
            </div>
            <div className='paytableRow row'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailText'>
                <span>#</span>of Winners
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 payDetailData'>
                {this.props.payTable.numberOfWinners}
              </div>
            </div>
              {Lists}
          </div>
        </div>
        <div className='closeBtnView' onClick={this.props.show}>
          <img
            src={closeicon}
            className='img img-responsive closeImg'
          />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 return{
   payTable: state.payTable,
   data: state.splash,
   room: state.room
 }
}

export default connect(mapStateToProps, null)(PopUpBox)
