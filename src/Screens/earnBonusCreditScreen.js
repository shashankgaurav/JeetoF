import React, { Component } from 'react'
import '../Stylesheets/accountBalanceScreen.css'
import PopupLayout from '../Components/popupLayout.js'
import { connect } from 'react-redux'
import { store } from '../store.js'
import Earnbonuscredit from '../Images/Earnbonuscredit.png'
import ReferYourFriends from '../Images/ReferYourFriends.png'
import closeicon from '../Images/closeicon.png'
import SubmitButton from '../Components/answerButton'
import Facebookbutton from '../Components/facebookButton.js'
import facebookIcon from '../Images/fb.png'
import { reactLocalStorage } from 'reactjs-localstorage'
const Router = require('react-router')
let thisRef = ''

let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb');
console.log(jeetomoneystore)
let userData=''


class AccountBalanceScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      screenType: 'accountBalance'
    }
    thisRef = this
  }
  componentWillMount(){
  userData=jeetomoneystore.jeetomoney.userdata;
  }
  redirectToAccount () {
    Router.browserHistory.push('/AccountBalance')
  }
  renderBonusWithDetail () {
    return (
      <div className='earnBonusMiddleDiv'>
        <div className='earnBonusMoneyFirstDisplay'>
          <span className='earnBonusMoneyDisplayText '>
            Earn bonus credit of <span className='currency'>₹ 20</span>
          </span>
        </div>
        <div className='earnBonusFacebookDisplay'>
          <div className='earnBonusFaceBookButton'>
            <SubmitButton name={this.facebookButton} />
          </div>
        </div>

        <div className='earnBonusLinkDisplay'>
          <div className='earnBonusTextDisplay'>
            <span className='earnBonusMoneyDisplayText'>
              Earn Rs.100 by playing game
            </span>
          </div>
          <div className='earnBonusCreditLinkBg'>
            <a
              href='http://www.hotstar.com/'
              className='earnBonusLinkDisplayText'
              target='_blank'
            >
              http://www.hotstar.com/
            </a>
          </div>
        </div>

        <div className='earnBonusLinkDisplay'>
          <div className='earnBonusTextDisplay'>
            <span className='earnBonusMoneyDisplayText'>
              Earn Rs.50 by doning survey link
            </span>
          </div>
          <div className='earnBonusCreditLinkBg'>
            <a
              href='http://www.hotstar.com/'
              className='earnBonusLinkDisplayText'
              target='_blank'
            >
              http://www.hotstar.com/
            </a>
          </div>
        </div>

        <div className='earnBonusLinkDisplay'>
          <div className='earnBonusTextDisplay'>
            <span className='earnBonusMoneyDisplayText'>
              Earn Rs.200 by subscribing to Hotstar
            </span>
          </div>
          <div className='earnBonusCreditLinkBg'>
            <a
              href='http://www.hotstar.com/'
              className='earnBonusLinkDisplayText'
              target='_blank'
            >
              http://www.hotstar.com/
            </a>
          </div>
        </div>
      </div>
    )
  }
  renderBonus () {
    if(userData.facebookID)
    {
      return(
        <span></span>
        )
    }
    else{
      return (
        <div className='earnBonusShortDetail'>
          <div className='earnBonusMoneyFirstDisplay'>
            <span className='earnBonusMoneyDisplayText '>
              Earn bonus credit of <span className='currency'>₹ 20</span>
            </span>
          </div>
          <div className='earnBonusFacebookDisplay'>
            <div className='earnBonusFaceBookButton'>
              <SubmitButton name={this.facebookButton} />
            </div>
          </div>
        </div>
          )
    }



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
      <div className='container-fluid earnBonusCreditScreenContainer'>
        <div className='earnBonusCloseBtnView' onClick={this.redirectToAccount}>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive earnBonusCloseImg'
          />

        </div>
        <div className='earnBonusWrapper'>
          <div className='earnBonuspanel'>
            {/* <div className='addMoneyPopupContainer'> */}
            {/* <div className='addMoneyPopupView'> */}
            {/* <div className='earnBonusMainDiv'> */}
            {/* <div className='earnBonusInnerDiv'> */}
            <div className='earnBonusTopDiv'>
              <img src={Earnbonuscredit} className='earnBonusTitleImg' />
            </div>
            {/*<div className='earnBonusMiddleDiv'>
              <div className='earnBonusMoneyFirstDisplay'>
                <span className='earnBonusMoneyDisplayText '>
                  Earn bonus credit of <span className='currency'>₹ 20</span>
                </span>
              </div>
              <div className='earnBonusFacebookDisplay'>
                <div className='earnBonusFaceBookButton'>
                  <SubmitButton name={this.facebookButton} />
                </div>
              </div>

              <div className='earnBonusLinkDisplay'>
                <div className='earnBonusTextDisplay'>
                  <span className='earnBonusMoneyDisplayText'>
                    Earn Rs.100 by playing game
                  </span>
                </div>
                <div className='earnBonusCreditLinkBg'>
                  <a
                    href='http://www.hotstar.com/'
                    className='earnBonusLinkDisplayText'
                    target='_blank'
                  >
                    http://www.hotstar.com/
                  </a>
                </div>
              </div>

              <div className='earnBonusLinkDisplay'>
                <div className='earnBonusTextDisplay'>
                  <span className='earnBonusMoneyDisplayText'>
                    Earn Rs.50 by doning survey link
                  </span>
                </div>
                <div className='earnBonusCreditLinkBg'>
                  <a
                    href='http://www.hotstar.com/'
                    className='earnBonusLinkDisplayText'
                    target='_blank'
                  >
                    http://www.hotstar.com/
                  </a>
                </div>
              </div>

              <div className='earnBonusLinkDisplay'>
                <div className='earnBonusTextDisplay'>
                  <span className='earnBonusMoneyDisplayText'>
                    Earn Rs.200 by subscribing to Hotstar
                  </span>
                </div>
                <div className='earnBonusCreditLinkBg'>
                  <a
                    href='http://www.hotstar.com/'
                    className='earnBonusLinkDisplayText'
                    target='_blank'
                  >
                    http://www.hotstar.com/
                  </a>
                </div>
              </div>
            </div>*/}
            {this.renderBonus()}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}

            {/* </div> */}
          </div>
          <div className='refferanceCodePanel'>
            <div className='bonusReffcodeWrapper'>
              <div className='refCodeLogo'>
                <img src={ReferYourFriends} className='earnBonusTitleImg' />
              </div>
              <div className='refCodeText'>
                You and your friend can both get a free entry to daily
                {' '}
                <span className='upperCase'>Jeeto jackpot </span>
                ₹ 1000  around if your friend signs up using your referrel code given bellow
              </div>
              <div className='refCodePanel'>
                <div className='bonusCodeWrapper'>
                  <div className='bonusCodeText'>Referrel Code :</div>
                  <div className='bonusRCode'>{userData.referral_code}</div>
                </div>
                <div className='bonusRefferCodeText'>
                  *You can refer unlimited friends{' '}
                </div>
              </div>
              <div className='bonusRefCodeShare' />
            </div>
          </div>
        </div>
        {/* <div className='addMoneyPopupContainer'>
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
                    <a
                      href='http://www.hotstar.com/'
                      className='earnBonusLinkDisplayText'
                      target='_blank'
                    >
                      http://www.hotstar.com/
                    </a>
                  </div>
                  <div className='earnBonusTextDisplay'>
                    <text className='earnBonusMoneyDisplayText'>
                      Earn Rs.50 by doning survey link
                    </text>
                  </div>
                  <div className='earnBonusLinkDisplay'>
                    <a
                      href='http://www.hotstar.com/'
                      className='earnBonusLinkDisplayText'
                      target='_blank'
                    >
                      http://www.hotstar.com/
                    </a>
                  </div>
                  <div className='earnBonusTextDisplay'>
                    <text className='earnBonusMoneyDisplayText'>
                      Earn Rs.200 by subscribing to Hotstar
                    </text>
                  </div>
                  <div className='earnBonusLinkDisplay'>
                    <a
                      href='http://www.hotstar.com/'
                      className='earnBonusLinkDisplayText'
                      target='_blank'
                    >
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
        </div> */}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    screenType: state
  }
}

// mapDispatchToProps = (dispatch) = {
// }
export default connect(mapStateToProps, null)(AccountBalanceScreen)
