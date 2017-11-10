import React, { Component } from 'react'
import '../Stylesheets/congratulationScreen.css'
import Button from '../Components/answerButton'
import PopupLogo from '../Components/popupLayoutLogo'
import Facebookbutton from '../Components/facebookButton'
import facebookIcon from '../Images/fb.png'

class congratulation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      referral_code: 'refcode'
    }
  }
  render () {
    return (
      <div className='congratulationWrapper'>
        <div className='congratulationPanel'>
          <div className='closeCongratulation' />
          <div className='congratulationDivWrapper'>
            <div className='congratsImage' />
            <div className='congratsCreaditText'>
              You have earned
              {' '}
              <span className='congratsCreditAmountWrapper'>
                Rs.<span className='congratsCreditAmount'>20</span>
              </span>
              {' '}
              bonus credit!
            </div>
            <div className='congratulationButtonPanel'>
              <Button name={'Next'} />

            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default congratulation
