import React, { Component } from 'react'
import '../Stylesheets/earnBonusCredit.css'
import closeicon from '../Images/closeicon.png'
import Earnbonuscredit from '../Images/Earnbonuscredit.png'
import SubmitButton from '../Components/answerButton'
import Facebookbutton from './facebookButton.js'
import facebookIcon from '../Images/fb.png'
let thisRef = ''
class EarnBonus extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { earnBonusshow: false, addMoneyButton: 'Add Money' }
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ earnBonusshow: !thisRef.state.earnBonusshow })
  }
  render () {
    this.facebookButton = (
      <div className='row'>
        <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 text-right'>
          <img src={facebookIcon} className='facebookIcon' />
        </div>
        <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 text-left'>
          {' '}<Facebookbutton />
        </div>
      </div>
    )

    return (
      <div className='addMoneyPopupContainer'>
        <div className='addMoneyPopupView'>
          <div className='earnBonusMainDiv'>
            <div className='earnBonusInnerDiv'>
              <div className='earnBonusTopDiv'>
                <img src={Earnbonuscredit} className='earnBonusTitleImg' />
              </div>
              <div className='earnBonusMiddleDiv'>
                <div className='earnBonusMoneyDisplay'>
                  <text className='earnBonusMoneyDisplayText'>
                    Earn bonus credit of  RS.20
                  </text>
                </div>
                <div className='earnBonusFacebookDisplay'>
                  <div className='earnBonusFaceBookButton'>
                    <SubmitButton name={this.facebookButton} />
                  </div>
                </div>
                <div className='earnBonusTextDisplay'>
                  <text className='earnBonusMoneyDisplayText'>
                    Earn Rs.100 by playing game
                  </text>
                </div>
                <div className='earnBonusLinkDisplay'>
                  <a href="http://www.hotstar.com/" className='earnBonusLinkDisplayText' target="_blank">
                    http://www.hotstar.com/
                  </a>
                </div>
                <div className='earnBonusTextDisplay'>
                  <text className='earnBonusMoneyDisplayText'>
                  Earn Rs.50 by doning survey link
                  </text>
                </div>
                <div className='earnBonusLinkDisplay'>
                <a href="http://www.hotstar.com/" className='earnBonusLinkDisplayText' target="_blank">
                  http://www.hotstar.com/
                </a>
              </div>
                <div className='earnBonusTextDisplay'>
                  <text className='earnBonusMoneyDisplayText'>
                  Earn Rs.200 by subscribing to Hotstar
                  </text>
                </div>
                <div className='earnBonusLinkDisplay'>
                <a href="http://www.hotstar.com/" className='earnBonusLinkDisplayText' target="_blank">
                  http://www.hotstar.com/
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className='earnBonusCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive earnBonusCloseImg'
          />

        </div>
      </div>
    )
  }
}
export default EarnBonus
