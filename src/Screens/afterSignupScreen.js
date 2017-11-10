import React, { Component } from 'react'
import '../Stylesheets/afterSignupScreen.css'
import Button from '../Components/answerButton'
import PopupLogo from '../Components/popupLayoutLogo'
import Facebookbutton from '../Components/facebookButton'
import facebookIcon from '../Images/fb.png'
const Router = require('react-router')

class FTURefferalCode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      referral_code: 'refcode'
    }
  }
  redirectToHomeScreen () {
    Router.browserHistory.push('/HomeScreen')
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
      <div className='afterSignUpWrapper'>
        <div className='afterSignupScreenPanel'>
          <div className='closeAfterSign' onClick={this.redirectToHomeScreen} />
          <div className='afterSignLogo'>
            <PopupLogo />
          </div>
          <div className='afterSingupTextWrapper'>
            <div className='creditAmountText'>
              You can earn &#8377; 20 bonus credit by selecting <b>CONTINUE WITH FACEBOOK</b> option.
            </div>
            <div className='jackPointText'>
              You can also earn upto 20 free entries to daily <b>JEETO JACKPOT &#8377; 1000</b> game.
            </div>
            <div className='addMoneyText'>
              Alternatively, you can add money to your user account by selecting ADD MONEY
            </div>
          </div>
          <div className='afterSignUpButtonPanel'>
            <div className='afterSignupFacebook'>
              <Button name={this.facebookButton} />
            </div>
            <div className='afterSignupAddMoney'>
              <Button name={'Add Money'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default FTURefferalCode
