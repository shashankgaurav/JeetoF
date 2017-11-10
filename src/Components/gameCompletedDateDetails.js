import React, { Component } from 'react';
import EntryFeeImage from '../Images/entryfee.png';
import RoomTypeImage from '../Images/roomtype.png';
import '../Stylesheets/mainLeaderboardScreen.css';


class HeaderBadge extends Component {
    constructor(props) {
        super(props);
    }
   
    render() {
    return(
        <div className="row gameCompletedDetailsRow">
            <div className='col-md-2'></div>
        <div className='col-md-3 completedCaption'>Completed on:</div>
        <div className='col-md-3 completedDate'>
            {this.props.gameCompletedDateDetails.completedDate}
        </div>
        <div className='col-md-3 completedTime'>
            {this.props.gameCompletedDateDetails.completedTime}
        </div>
        <div className='col-md-1'></div>
        </div>
        )
    }
}
export default HeaderBadge;