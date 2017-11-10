import React, { Component } from 'react'
import '../Stylesheets/withdrawMoneyConfirmation.css'
import closeicon from '../Images/closeicon.png'
import WithdrawMoneyConfirmationImage from '../Images/WithdrawMoneyConfirmation.png'
import SubmitButton from '../Components/answerButton'
let thisRef = ''
class WithdrawMoneyConfirmation extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { withdrawMoneyConfirmationshow: false,withdrawMoneyButton:'OK' }
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ withdrawMoneyConfirmationshow: !thisRef.state.withdrawMoneyConfirmationshow })
  }
  render () {
    return (
      <div className='withdrawMoneyConfirmationPopupContainer'>
        <div className='withdrawMoneyConfirmationPopupView'>
          <div className='withdrawMoneyConfirmationMainDiv'>
            <div className='withdrawMoneyConfirmationInnerDiv'>
              <div className='withdrawMoneyConfirmationTopDiv'>
                <img src={WithdrawMoneyConfirmationImage} className='withdrawMoneyConfirmationTitleImg' />
              </div>
              <div className='withdrawMoneyConfirmationMiddleDiv'>
                <div className='withdrawMoneyConfirmationTextDiv'>
                  <div>
                  <text>
                  {this.props.message1}
                    {/* Your request to withdraw Rs XXXX has been accepted. */}
                  </text>
                  </div>
                  <div>
                  <text>
                  {this.props.message2}
                    {/* The same will be processed within XXX days.The withdrawal amount will be credited to your provided bank account subject to any applicable income tax deduction. */}
                  </text>
                  </div>
                </div>
              </div>
              <div className='withdrawMoneyConfirmationBottomDiv' onClick={thisRef.props.onPress}>
                <SubmitButton name={this.state.withdrawMoneyButton} />
              </div>
            </div>
          </div>
        </div>
        <div className='withdrawMoneyConfirmationCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive withdrawMoneyConfirmationCloseImg'
          />

        </div>
      </div>
    )
  }
}
export default WithdrawMoneyConfirmation
