import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../Stylesheets/withdrawMoney.css'
import closeicon from '../Images/closeicon.png'
import WithdrawMoneyImage from '../Images/withdrawMoney.png'
import SubmitButton from '../Components/answerButton'
import {withdrawMoneyAction} from '../Actions/withdrawMoneyAction'
import { reactLocalStorage } from 'reactjs-localstorage'
let thisRef = ''

let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb');
let userData=''

class WithdrawMoney extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { withdrawMoneyshow: false,withdrawMoneyButton:'WITHDRAW' }
  }
  componentWillMount () {
    userData=jeetomoneystore.jeetomoney.userdata;
    console.log(userData);
  }

  onClick (e) {
    e.preventDefault()
    thisRef.setState({ withdrawMoneyshow: !thisRef.state.withdrawMoneyshow })
  }
  handleWithdrawAmountChange(event)
  {
    thisRef.setState({ [event.target.name]: event.target.value })
  }
  handleWithdrawAmountSubmit(event)
  {
    event.preventDefault()
    if(thisRef.state.withdrawAmount>=200)
    {
      thisRef.props.withdrawMoneyAction(thisRef.state)
    }
    else{
        alert("Minimum withdraw amount is Rs.200")
    }
  }
  
  render () {
    return (
      <div className='withdrawMoneyPopupContainer'>
        <div className='withdrawMoneyPopupView'>
          <div className='withdrawMoneyMainDiv'>
            <div className='withdrawMoneyInnerDiv'>
              <div className='withdrawMoneyTopDiv'>
                <img src={WithdrawMoneyImage} className='withdrawMoneyTitleImg' />
              </div>
              <div className='withdrawMoneyMiddleDiv'>
              <form onSubmit={this.handleWithdrawAmountSubmit}>
                <div className='withdrawMoneyWinningAccountBalance'>
                <div className="withdrawMoneyWinningAccountBalanceTop">
                 <text className="withdrawMoneyWinningAccountBalanceLeftText">Winning Account Balance: </text>
                 <text className="withdrawMoneyWinningAccountBalanceRightText">&#8377; {userData.masterPlayerGameAccountDetails.winning_account_balance}</text>
                 </div>
                 <div className="withdrawMoneyWinningAccountBalanceBottom">
                    <text>
                      (Minimum withdrawl amount Rs 200)
                    </text>
                 </div>
                </div>

                <div className='withdrawMoneyEnterAmount'>
                  <div className='row'>
                    <div className='col-xs-5 col-sm-5 col-md-5 col-lg-5 withdrawMoneyAmountText'>
                      <div class='form-group'>
                        <label
                          for='exampleFormControlInput1'
                          className='withdrawMoneyInputLabel'
                        >
                          Withdraw Amount :  &#8377;
                        </label>
                      </div>
                    </div>
                    <div className='col-xs-7 col-sm-7 col-md-7 col-lg-7'>
                      <div class='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          id='exampleFormControlInput1'
                          name='withdrawAmount'
                          value={this.state.withdrawAmount}
                          onChange={this.handleWithdrawAmountChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='withdrawMoneyBlankDiv'>
                  
                </div>
                <div className='withdrawMoneyBottomDiv'>
                <SubmitButton name={this.state.withdrawMoneyButton} type={'submit'} />
                </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
        <div className='withdrawMoneyCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive withdrawMoneyCloseImg'
          />

        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    // email: state.emailVerify
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({withdrawMoneyAction}, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithdrawMoney)
