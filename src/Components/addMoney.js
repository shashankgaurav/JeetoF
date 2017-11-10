import React, { Component } from 'react'
import '../Stylesheets/addMoney.css'
import closeicon from '../Images/closeicon.png'
import ADDMONEYHEADING from '../Images/ADDMONEYHEADING.png'
import SubmitButton from '../Components/answerButton'
import { paytmpayment } from '../Actions/addMoneyAction.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
let thisRef = ''
class AddMoney extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = { show: false, addMoneyButton: 'Add Money' }
  }
  onClick (e) {
    e.preventDefault()
    thisRef.setState({ show: !thisRef.state.show })
  }
  callpaytm () {
    thisRef.props.paytmpayment('samidha')
  }
  render () {
    return (
      <div className='addMoneyPopupContainer'>
        <div className='addMoneyPopupView'>
          <div className='addMoneyMainDiv'>
            <div className='addMoneyInnerDiv'>
              <div className='addMoneyTopDiv'>
                <img src={ADDMONEYHEADING} className='AddMoneyTitleImg' />
              </div>
              <div className='addMoneyMiddleDiv'>
                <div className='addMoneyCurrentBalance'>
                  <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                      <div className='form-group'>
                        <label
                          for='exampleFormControlInput1'
                          className='addMoneyInputLabel'
                        >
                          Account Balance :&nbsp;&nbsp;
                          <text className='addMoneyRupeeText'>₹500000</text>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='addMoneyEnterAmount'>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-xs-4 col-sm-4 col-md-12 col-lg-12'>
                        <label
                          for='exampleFormControlInput1'
                          className='addMoneyInputLabel'
                        >
                          Enter Amount : &nbsp;&nbsp;₹
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          id='exampleFormControlInput1'
                          name='email'
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='addMoneyBlankSpace' />
                <div className='addMoneyNoteText'>
                  <text>
                    Bonus credit will be added to your account as follows
                  </text>
                </div>
              </div>
              <div className='addMoneyBottomDiv'>
                <div className='addMoneyBonusUpperDiv'>
                  <div className='addMoneyBonusDivLeft'>
                    <div className='addMoneyBonusTextTop'>
                      <text>50 to 199</text>
                    </div>
                    <div className='addMoneyBonusTextBottom'>
                      <text>10% bonus </text>
                    </div>
                  </div>
                  <div className='addMoneyBonusDivMiddle'>
                    <div className='addMoneyBonusTextTop'>
                      <text>200 to 499</text>
                    </div>
                    <div className='addMoneyBonusTextBottom'>
                      <text>15% bonus </text>
                    </div>
                  </div>
                  <div className='addMoneyBonusDivRight'>
                    <div className='addMoneyBonusTextTop'>
                      <text>500 or more</text>
                    </div>
                    <div className='addMoneyBonusTextBottom'>
                      <text>20% bonus </text>
                    </div>
                  </div>
                </div>
                <div className='addMoneyBonusLowerDiv' onClick={this.callpaytm}>
                  <SubmitButton name={this.state.addMoneyButton} />
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='addMoneyCloseBtnView'>
          <img
            onClick={thisRef.props.onPress}
            src={closeicon}
            className='img img-responsive addMoneyCloseImg'
          />

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    button: state.button[0],
    data: state.splash,
    room: state.room,
    cardData: state.cardData,
    deductAmountPopup: state.deductAmountPopup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ paytmpayment }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddMoney)
