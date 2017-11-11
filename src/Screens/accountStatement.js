import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../Stylesheets/accountStatement.css'
import '../Stylesheets/tab.css'
import AccountStatementImage from '../Images/AccountStatement.png'
import Backbtn from '../Images/backbtn-min.png'
import Homebtn from '../Images/homebtn.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { userAccountStatementAction } from '../Actions/accountStatementAction'
import { reactLocalStorage } from 'reactjs-localstorage'
const Router = require('react-router')
let jeetomoneystore
let thisRef = ''
// console.log(jeetomoneystore.jeetomoney.userAccountStatement.rows)
// let dataa = jeetomoneystore.jeetomoney.userAccountStatement.rows;
let dataa=''

class AccountStatement extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = {
      earnBonusshow: false,
      accountType: 'User'
    }
  }
  componentWillMount () {
    console.log(thisRef.props)
    thisRef.setState(
      {
        accountType: 'User'
      },
      function () {
        thisRef.props.userAccountStatementAction(thisRef.state)
      }
    )
    jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
  }
  componentWillReceiveProps () {
    jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb') 
  }
  changeUserAccountEvent () {
    thisRef.setState(
      {
        accountType: 'User'
      },
      function () {
        thisRef.props.userAccountStatementAction(thisRef.state)
      }
    )
  }
  changeBonusAccountEvent () {
    thisRef.setState(
      {
        accountType: 'Bonus'
      },
      function () {
        thisRef.props.userAccountStatementAction(thisRef.state)
      }
    )
  }
  changeWinningAccountEvent () {
    thisRef.setState(
      {
        accountType: 'Winning'
      },
      function () {
        thisRef.props.userAccountStatementAction(thisRef.state)
      }
    )
  }
  homeBtnChange()
  {
    Router.browserHistory.push('/HomeScreen') 
  }
  backButtonRedirection(){
    Router.browserHistory.push('/AccountBalance') 
  }

  render () {
   if(jeetomoneystore.jeetomoney.userAccountStatement == undefined){
    dataa = []
   }else{
    dataa = jeetomoneystore.jeetomoney.userAccountStatement.rows
     
   }
    
    const Lists = dataa.map((item, i) => {
     let returnText
     if(item.account_type==='User')
     {
      if (item.transaction_type === 'Credit') {
        if (item.bonus_transaction_amount > 0) {
          returnText = (
            <text>
              ₹{' '}{item.user_transaction_amount}{' '}{item.transaction_type}ed to your account and Bouns amount is{' '}{item.bonus_transaction_amount}
            </text>
          )
        } else {
          returnText = (
            <text>
              ₹{' '}{item.user_transaction_amount}{' '}{item.transaction_type}ed to your account.
            </text>
          )
        }
      } else {
        returnText = (
          <text>
            ₹{' '}{item.user_transaction_amount}{' '}{item.transaction_type}ed from your account.
          </text>
        )
      }
    }
    else if(item.account_type==='Bonus')
    {
        if (item.rs1000_jackpot_free_entries > 0) {
          returnText = (
            <text>
              You have won a {item.rs1000_jackpot_free_entries} jackpot entries.
            </text>
          )
        } else {
          returnText = (
            <text>
              You have won the ₹ {item.bonus_transaction_amount} as a bonus.
            </text>
          )
        }
    }
    else if(item.account_type==='Winning')
    {
      if (item.transaction_type === 'Credit') {
        if (item.bonus_transaction_amount > 0) {
          returnText = (
            <text>
              ₹{' '}{item.user_transaction_amount}{' '}{item.transaction_type}ed to your account and Bouns amount is{' '}{item.bonus_transaction_amount} {item.account_type}
            </text>
          )
        } else {
          returnText = (
            <text>
              ₹{' '}{item.user_transaction_amount}{' '}{item.transaction_type}ed to your account.{item.account_type}
            </text>
          )
        }
      } else {
        returnText = (
          <text>
            ₹{' '}{item.user_transaction_amount}{' '}{item.transaction_type}ed from your account {item.account_type}
          </text>
        )
      }

    }
     return (
        <div className='accountStatementUserAccountDataMainDiv' id={i}>
          <div className='accountStatementUserAccountData'>
            <div className='accountStatementUserAccountText'>
              {returnText}
            </div>
          </div>
        </div>
      )
    })

    
    return (
      <div className='container-fluid accountStatementScreen'>
        <div className='accountStatementMainDiv'>
          <div className='accountStatementInnerDiv'>
            <div className='accountStatementTopDiv'>
              <img
                src={AccountStatementImage}
                className='accountStatementImages img img-responsive'
              />
            </div>

            <div className='accountStatementTabView'>
              <div className='accountStatementInnerTabView'>
                <Tabs>
                  <TabList>
                    <Tab onClick={this.changeUserAccountEvent}>
                      User Account
                    </Tab>
                    <Tab onClick={this.changeBonusAccountEvent}>
                      Bonus Account
                    </Tab>
                    <Tab onClick={this.changeWinningAccountEvent}>
                      Winning Account
                    </Tab>
                  </TabList>

                  <TabPanel>
                    <div className='accountStatementUserAccountTabPanel'>
                      {Lists}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='accountStatementUserAccountTabPanel'>
                    {Lists}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='accountStatementUserAccountTabPanel'>
                      {Lists}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <div className='accountStatementBottomView'>
              <div className='accountStatementBottomViewLeft'>
                <img
                  src={Backbtn} onClick={this.backButtonRedirection}
                  className='accountStatementBackBtnImages img img-responsive'
                />
              </div>
              <div className='accountStatementBottomViewRight'>
                <img
                  src={Homebtn}
                  className='accountStatementHomeBtnImages img img-responsive' onClick={this.homeBtnChange}
                />
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
    userAccountStatement: state.userAccountStatement
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({ userAccountStatementAction }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountStatement)
