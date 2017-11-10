import React, { Component } from 'react'
import '../Stylesheets/payEntryFeeJackpotPopup.css'
import closeicon from '../Images/closeicon.png'
import SubmitButton from '../Components/answerButton'
let thisRef = ''
class payEntryFeeJackpot extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { payEntryFeeJackpotshow: false,payEntryFeeJackpotButton:'OK' }
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ payEntryFeeJackpotshow: !thisRef.state.payEntryFeeJackpotshow })
  }
  render () {
    return (
      <div className='payEntryFeeJackpotPopupContainer'>
        <div className='payEntryFeeJackpotPopupView'>
          <div className='payEntryFeeJackpotMainDiv'>
            <div className='payEntryFeeJackpotInnerDiv'>
              <div className='payEntryFeeJackpotTopDiv'>
              </div>
              <div className='payEntryFeeJackpotMiddleDiv'>
                <div className='payEntryFeeJackpotWinningAccountBalance'>
                  
                </div>

                <div className='payEntryFeeJackpotText'>
                <div>
                  <text>
                    You will use 1 Jeeto Rs.1000 Jackpot entry for this game.
                  </text>
                  </div>
                  <div className='payEntryFeeJackpotBlankDiv'>
                </div>
                  <div>
                  <text>
                    Now you will have XXXX free entries remaining.
                  </text>
                  </div>
                </div>
                <div className='payEntryFeeJackpotBlankDiv'>
                </div>
                <div className='payEntryFeeJackpotBottomDiv'>
                <SubmitButton name={this.state.payEntryFeeJackpotButton} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='payEntryFeeJackpotCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive payEntryFeeJackpotCloseImg'
          />

        </div>
      </div>
    )
  }
}
export default payEntryFeeJackpot
