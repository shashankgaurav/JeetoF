import React, { Component } from 'react'
import '../Stylesheets/payEntryFeeInsufficientBalance.css'
import closeicon from '../Images/closeicon.png'
import SubmitButton from '../Components/answerButton'
import Facebookbutton from './facebookButton.js'
import facebookIcon from '../Images/fb.png'
import { reactLocalStorage } from 'reactjs-localstorage'
import AddMoney from '../Components/addMoney.js'

let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')

let thisRef = ''
class payEntryFeeInsufficientBalance extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = {
      show:false,
      payEntryFeeInsufficientBalanceshow: false,
      payEntryFeeInsufficientBalanceButton: 'ADD MONEY'
    }
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({
      payEntryFeeInsufficientBalanceshow: !thisRef.state
        .payEntryFeeInsufficientBalanceshow
    })
  }
  addMoney = () => {
    thisRef.setState({show:true})
  }
  renderPopup () {
    if (thisRef.state.show) {
      return (
        <AddMoney  onPress={() => thisRef.setState({ show: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  showpopupinsufficientBalance () {
    if (
      jeetomoneydata.jeetomoney.userdata.facebookID
    ) {
      return(
      <div className='payEntryFeeInsufficientBalancePopupContainer'>
        <div className='payEntryFeeInsufficientBalancePopupView'>
          <div className='payEntryFeeInsufficientBalanceMainDiv'>
            <div className='payEntryFeeInsufficientBalanceInnerDiv'>
              <div className='payEntryFeeInsufficientBalanceTopDiv' />
              <div className='payEntryFeeInsufficientBalanceMiddleDiv'>
                <div className='payEntryFeeInsufficientBalanceWinningAccountBalance' />

                <div className='payEntryFeeInsufficientBalanceText'>
                  <div>
                    <text />
                  </div>
                  <div className='payEntryFeeInsufficientBalanceBlankDiv' />
                </div>
                <div className='payEntryFeeInsufficientBalanceBlankDiv' />
                <div className='payEntryFeeInsufficientBalanceBottomDiv' onClick={this.addMoney}>
                  <SubmitButton
                    name={this.state.payEntryFeeInsufficientBalanceButton}
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className='payEntryFeeInsufficientBalanceCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive payEntryFeeInsufficientBalanceCloseImg'
          />

        </div>
      </div>
      )
    }else{
      return(
        <div className='payEntryFeeInsufficientBalancePopupContainer'>
          <div className='payEntryFeeInsufficientBalancePopupView'>
            <div className='payEntryFeeInsufficientBalanceMainDiv'>
              <div className='payEntryFeeInsufficientBalanceInnerDiv'>
                <div className='payEntryFeeInsufficientBalanceTopDiv' />
                <div className='payEntryFeeInsufficientBalanceMiddleDiv'>
                  <div className='payEntryFeeInsufficientBalanceWinningAccountBalance' />
  
                  <div className='payEntryFeeInsufficientBalanceText'>
                    <div>
                      <text />
                    </div>
                    <div className='payEntryFeeInsufficientBalanceBlankDiv' />
                    <div>
                      <text>
                        Now you will have {jeetomoneydata.jeetomoney.userdata.masterPlayerGameAccountDetails.total_account_balance} free entries remaining.
                      </text>
                    </div>
                  </div>
                  <div className='payEntryFeeInsufficientBalanceBlankDiv' />
                  <div className='payEntryFeeInsufficientBalanceBottomDiv' onClick={this.addMoney}>
                    <SubmitButton
                      name={this.state.payEntryFeeInsufficientBalanceButton}
                    />
                  </div>
                </div>
                <div className='payEntryFeeInsufficientBalanceLastDiv'>
                  <div className='payEntryFeeInsufficientBalanceDivider' />
                  <div className='payEntryFeeInsufficientBalanceSocialLoginText'>
                    <div className='payEntryFeeInsufficientBalanceSocialTextSignUp'>
                      Login with Facebook and get bonus credit of Rs.20
                    </div>
                    <div className='payEntryFeeInsufficientBalanceSocialImage'>
                      <SubmitButton name={this.facebookButton} type={'submit'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='payEntryFeeInsufficientBalanceCloseBtnView'>
            <img
              onClick={thisRef.props.onPress}
              src={closeicon}
              className='img img-responsive payEntryFeeInsufficientBalanceCloseImg'
            />
  
          </div>
        </div>
        )
    }
  }
  render () {
    this.facebookButton = (
      <div className='facebookWrapper'>
        <div className='facebookIconWrapper text-right'>
          <img src={facebookIcon} className='facebookIcon' />
        </div>
        <div className='facebookText text-left'>
          {' '}<Facebookbutton referral_code={this.state.referral_code} />
        </div>
      </div>
    )

    return (
      <div>
        {this.showpopupinsufficientBalance()}
        {thisRef.renderPopup()}
      </div>
    )
  }
}
export default payEntryFeeInsufficientBalance
