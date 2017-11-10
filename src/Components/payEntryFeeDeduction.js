import React, { Component } from 'react';
import '../Stylesheets/payEntryFeeDeduction.css';
import closeicon from '../Images/closeicon.png';
import SubmitButton from '../Components/answerButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
let thisRef = '';
let room
class payEntryFeeDeduction extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { payEntryFeeDeductionshow: false,payEntryFeeDeductionButton:'OK' }
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ payEntryFeeDeductionshow: !thisRef.state.payEntryFeeDeductionshow })
  }
  render () {
    if (Object.keys(this.props.room).length > 0){room = this.props.room;}else{ room = 10;}
    return (
      <div className='payEntryFeeDeductionPopupContainer'>
        <div className='payEntryFeeDeductionPopupView'>
          <div className='payEntryFeeDeductionMainDiv'>
            <div className='payEntryFeeDeductionInnerDiv'>
              <div className='payEntryFeeDeductionTopDiv'>
              </div>
              <div className='payEntryFeeDeductionMiddleDiv'>
                <div className='payEntryFeeDeductionWinningAccountBalance'>
                </div>

                <div className='payEntryFeeDeductionText'>
                  <text>
                    &#8377; {room} will be deducted from your account balance for this game.
                  </text>
                </div>
                <div className='payEntryFeeDeductionBlankDiv'>
                </div>
                <div className='payEntryFeeDeductionBottomDiv' onClick = {this.props.click}>
                <SubmitButton name={this.state.payEntryFeeDeductionButton} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='payEntryFeeDeductionCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive payEntryFeeDeductionCloseImg'
          />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    room: state.room
  }
}
export default connect(mapStateToProps, null)(payEntryFeeDeduction);
