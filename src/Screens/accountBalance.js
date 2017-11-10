import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../Stylesheets/accountBalance.css'
import AccBalanceTitle from '../Images/account_balance_heading.png'
import transparent_patch_small from '../Images/transparent_patch_small.png'
import transparent_patch_big from '../Images/transparent_patch_big.png'
import Backbtn from '../Images/backbtn-min.png'
import SubmitButton from '../Components/answerButton'
import AddMoney from '../Components/addMoney'
import EarnBonus from '../Components/earnBonusCredit'
import WithdrawMoney from '../Components/withdrawMoney'
import WithdrawMoneyConfirmation from '../Components/withdrawMoneyConfirmation'
import PayEntryFeeDeduction from '../Components/payEntryFeeDeduction'
import PayEntryFeeJackpot from '../Components/payEntryFeeJackpotPopup'
import PayEntryFeeInsufficientBalance from '../Components/payEntryFeeInsufficientBalance'
import { reactLocalStorage } from 'reactjs-localstorage'
import { getProfileData } from '../Actions/homeScreenAction'
const Router = require('react-router')
let thisRef=''
let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb');
console.log(jeetomoneystore);
// let userAccountBalanceDetails=[]
// console.log("jeeto",jeetomoneystore.jeetomoney.userdata.masterPlayerGameAccountDetails);
class AccountBalance extends Component {
  constructor (props) {
    super(props)
    thisRef=this
    thisRef.state = {
      addMoneyButton: 'ADD MONEY',
      earnBonusButton: 'EARN BONUS CREDIT',
      withdrawButton: 'WITHDRAW',
      okButton: 'OK',
      accountStatementButton: 'ACCOUNT STATEMENT',
      verifyButton: 'VERIFY / CHANGE ACCOUNT DETAILS',
      show:false,
      earnBonusshow:false,
      withdrawMoneyshow:false,
      withdrawMoneyConfirmationshow:false,
      payEntryFeeDeductionshow:false,
      payEntryFeeJackpotshow:false,
      payEntryFeeInsufficientBalanceshow:false,
      msg1:'',
      msg2:''

    }
  }
  componentWillReceiveProps () {
    let userAccountBalanceDetails=jeetomoneystore.jeetomoney.userdata.masterPlayerGameAccountDetails;
    if(thisRef.props.withdrawMoney.withdrawMoneyData)
    {
      if(thisRef.props.withdrawMoney.withdrawMoneyData.Status===true)
        {
          let withdrawAmount=thisRef.props.withdrawMoney.withdrawMoneyData.withdrawMoneyResponse.withdrawal_amount;
          let txt1='Your request to withdraw Rs200 has been accepted.'
          let txt2='The same will be processed within 10 days.The withdrawal amount will be credited to your provided bank account subject to any applicable income tax deduction.'
          thisRef.setState({ withdrawMoneyshow: false,
            withdrawMoneyConfirmationshow: true,
            msg1: txt1,
            msg2: txt2
          })
          
          
        }
    }
  }
  componentWillMount () {
    this.props.getProfileData()
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
  earnBonus = () => {
    // thisRef.setState({earnBonusshow:true})
     Router.browserHistory.push('/EarnBonusCreditScreen')
  }
  earnBonusPopup () {
    if (thisRef.state.earnBonusshow) {
      return (
        <EarnBonus  onPress={() => thisRef.setState({ earnBonusshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  withdrawMoney = () => {
    thisRef.setState({withdrawMoneyshow:true})
  }
  withdrawMoneyPopup () {
    if (thisRef.state.withdrawMoneyshow) {
      return (
        <WithdrawMoney  onPress={() => thisRef.setState({ withdrawMoneyshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  withdrawMoneyConfirmation = () => {
    thisRef.setState({withdrawMoneyConfirmationshow:true})
  }
  withdrawMoneyConfirmationPopup () {
    if (thisRef.state.withdrawMoneyConfirmationshow) {
      return (
        <WithdrawMoneyConfirmation message1={this.state.msg1} message2={this.state.msg2} onPress={() => thisRef.setState({ withdrawMoneyConfirmationshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  payEntryFeeDeduction = () => {
    thisRef.setState({payEntryFeeDeductionshow:true})
  }
  payEntryFeeDeductionPopup () {
    if (thisRef.state.payEntryFeeDeductionshow) {
      return (
        <PayEntryFeeDeduction  onPress={() => thisRef.setState({ payEntryFeeDeductionshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  payEntryFeeJackpot = () => {
    thisRef.setState({payEntryFeeJackpotshow:true})
  }
  payEntryFeeJackpotPopup () {
    if (thisRef.state.payEntryFeeJackpotshow) {
      return (
        <PayEntryFeeJackpot  onPress={() => thisRef.setState({ payEntryFeeJackpotshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  payEntryFeeInsufficientBalance = () => {
    thisRef.setState({payEntryFeeInsufficientBalanceshow:true})
  }
  payEntryFeeInsufficientBalancePopup () {
    if (thisRef.state.payEntryFeeInsufficientBalanceshow) {
      return (
        <PayEntryFeeInsufficientBalance  onPress={() => thisRef.setState({ payEntryFeeInsufficientBalanceshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  accountStatementRedirection(){
    Router.browserHistory.push('/AccountStatement') 
  }
  withdrawVerificarionRedirection(){
    Router.browserHistory.push('/WithdrawVerification') 
  }
  homeBtnChange()
  {
    Router.browserHistory.push('/HomeScreen') 
  }

  render () {
    let userAccountBalanceDetails=jeetomoneystore.jeetomoney.userdata.masterPlayerGameAccountDetails;
    
    return (
      <div className='container-fluid accountBalanceScreen'>
        <div className='accountBalanceMainDiv'>
        {thisRef.renderPopup()}
        {thisRef.earnBonusPopup()}
        {thisRef.withdrawMoneyPopup()}
        {thisRef.withdrawMoneyConfirmationPopup()}
        {thisRef.payEntryFeeDeductionPopup()}
        {thisRef.payEntryFeeJackpotPopup()}
        {thisRef.payEntryFeeInsufficientBalancePopup()}
          <div className='accountBalanceInnerDiv'>
            <div className='accountBalanceTopDiv'>
              <img
                src={AccBalanceTitle}
                className='accountBalanceImages img img-responsive'
              />
            </div>
            <div className='accountBalanceMiddleDiv'>
              <div className='accBalance'>
                <div className='accBalanceLeft'>
                  <div className='accBalanceLeftTextFrist' />
                  <div className='accBalanceLeftTextLeftSide'>
                    <text>Account Balance:</text>
                  </div>
                  <div className='accBalanceLeftTextRightSide'>
                    <text className="accountDetailsMoneyText">&#8377; {userAccountBalanceDetails.total_account_balance}</text>
                  </div>
                </div>
                <div className='accBalanceRight' />
              </div>
              <div className='accUserAccount'>
                <div className='accUserAccountOuterDiv'>
                  <div className='accBalanceLeft'>
                    <div className='accUserAccountLeftTextFirst' />
                    <div className='accUserAccountLeftTextLeftSide'>
                      <text>User Account:</text>
                    </div>
                    <div className='accUserAccountLeftTextRightSide'>
                      <text className="accountDetailsMoneyText">&#8377; {userAccountBalanceDetails.user_account_balance}</text>
                    </div>
                  </div>
                  <div className='accUserAccountRight'>
                    <div className='accUserAccountRightLeftSide' onClick={this.addMoney}>
                      <SubmitButton name={this.state.addMoneyButton}/>
                    </div>
                    <div className='accUserAccountRightRightSide' />
                  </div>
                </div>
              </div>
              <div className='accUserAccount'>
                <div className='accUserAccountOuterDiv'>
                  <div className='accBalanceLeft'>
                    <div className='accUserAccountLeftTextFirst' />
                    <div className='accUserAccountLeftTextLeftSide'>
                      <text>Bonus Credit:</text>
                    </div>
                    <div className='accUserAccountLeftTextRightSide'>
                      <text className="accountDetailsMoneyText">&#8377; {userAccountBalanceDetails.bonus_account_balance}</text>
                    </div>
                  </div>
                  <div className='accUserAccountRight'>
                    <div className='accUserAccountRightLeftSide' onClick={this.earnBonus}>
                      <SubmitButton name={this.state.earnBonusButton}  />
                    </div>
                    <div className='accUserAccountRightRightSide' />
                  </div>
                </div>
              </div>
              <div className='accUserAccount'>
                <div className='accUserAccountOuterDiv'>
                  <div className='accBalanceLeft'>
                    <div className='accUserAccountLeftTextFirst' />
                    <div className='accUserAccountLeftTextLeftSide'>
                      <text>Winning Amount:</text>
                    </div>
                    <div className='accUserAccountLeftTextRightSide'>
                      <text className="accountDetailsMoneyText">&#8377; {userAccountBalanceDetails.winning_account_balance}</text>
                    </div>
                  </div>
                  <div className='accUserAccountRight'>
                    <div className='accUserAccountRightLeftSide' onClick={this.withdrawMoney}>
                      <SubmitButton name={this.state.withdrawButton} />
                    </div>
                    <div className='accUserAccountRightRightSide' />
                  </div>
                </div>
              </div>
              <div className='accUserAccount'>
                <div className='accUserAccountNotesOuterDiv'>
                  <div className='accUserAccountNotesLeft' />
                  <div className='accUserAccountNotesMiddle'>
                    <text>
                      (subject to minimum withdrawal amount of &#8377; 200.)
                    </text>
                  </div>
                  <div className='accUserAccountNotesLast' />
                </div>
              </div>
              <div className='accBalance'>
                <div className='accBalanceBottomLeft'>
                  {/*<div className='accBalanceLeftTextFrist' />*/}
                  <div className='accBalanceLeftTextLeftSide'>
                    <text> # of free entry to <span className="upperCase">Jeeto jackpot &#8377; 1000</span>  Game  <span className="number">{userAccountBalanceDetails.jeeto_rs1000_jackpot_free_entries}</span></text>
                  </div>
                  {/*<div className='accBalanceLeftTextRightSide'>
                    <text className="accountDetailsMoneyText">Rs 5</text>
                  </div>*/}
                </div>
                <div className='accBalanceRight' />
              </div>
              {/*<div className='accUserAccountNotes'>
                <div className='accUserAccountNotesOuterDiv'>
                  <div className='accUserAccountNotesLeft' />
                  <div className='accUserAccountNotesMiddle'>
                    <text>
                      Jackpot Entries
                    </text>
                  </div>
                  <div className='accUserAccountNotesLast' />
                </div>
              </div>*/}
            </div>
            <div className='accountBalanceBottomDiv'>
              <div className="accountBalanceBottomFirst">
                  <div className="accountBalanceBottomLeft" onClick={this.homeBtnChange}>
                  <SubmitButton name={this.state.okButton} />
                  </div>
                  <div className="accountBalanceBottomMiddle">

                  </div>
                  <div className="accountBalanceBottomRight" onClick={this.accountStatementRedirection}>
                  <SubmitButton name={this.state.accountStatementButton} />
                  </div>
              </div>
              <div className="accountBalanceBottomLast">
                    <div className="accountBalanceBottomLastLeft">
                    <img src={Backbtn} className='accountBalanceBackBtnImages img img-responsive'
              />
                    </div>
                    <div className="accountBalanceBottomLastMiddle">
                      <div className="accountBalanceBottomLastMiddleInner" onClick={this.withdrawVerificarionRedirection}>
                    <SubmitButton name={this.state.verifyButton} />
                    </div>
                    </div>
                    <div className="accountBalanceBottomLastRight">

                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    withdrawMoney: state.withdrawMoney
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({getProfileData}, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountBalance)
