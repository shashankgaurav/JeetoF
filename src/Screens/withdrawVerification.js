import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../Stylesheets/withdrawVerification.css'
import '../Stylesheets/tab.css'
import WVPBankAccountDetailsImage from '../Images/WVPbankaccountdetails.png'
import Backbtn from '../Images/backbtn-min.png'
import Homebtn from '../Images/homebtn.png'
import SubmitButton from '../Components/answerButton'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import VerifyEmailId from '../Components/verifyEmailId'
import WithdrawEmailVerification from '../Components/withdrawEmailVerificationPopup'
import { reactLocalStorage } from 'reactjs-localstorage'
import {submitPhoneChangeRequest,submitPanCardForm,submitBankDetailForm,getBankDetailsData} from '../Actions/withdrawVerificationAction'
import moment from 'moment';
const Router = require('react-router')
var DatePicker = require("react-bootstrap-date-picker");


let thisRef = ''
let userBankDetails=[]
let pan_card_full_name='';
let pan_card_father_name='';
let pan_card_number='';
let bank_Name='';
let bank_Branch_Name='';
let account_number='';
let account_holder_name='';
let ifsc_code='';
let jeetomoneystore;

class WithdrawVerification extends Component {
  constructor (props) {
    super(props)
    thisRef = this
    thisRef.state = {
      earnBonusshow: false,
      phoneChangeButton: 'CHANGE',
      emailChangeButton: 'CHANGE / VERIFY',
      bankAccountSubmitButton: 'SUBMIT',
      verifyEmailshow: false,
      withdrawEmailVerificationshow: false,
      phoneChangeRequest:false,
      // userBankDetails:[]
      // fullName :'',
      // fatherName:'',
      // dateOfBirth: '',
      // panNumber:'',
      // stateTerritory:''
    }
  }
  componentWillMount(){
    this.props.getBankDetailsData()
    jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
    // this.setState({userBankDetails:jeetomoneystore.jeetomoney.userBankDetails}, ()=>{
    // })
    let dateval=moment(userBankDetails.date_of_birth).format("YYYY-MM-DD")
    if(dateval!=undefined)
    {
    this.setState({dateOfBirth:dateval})
    }
  }
  
  componentWillReceiveProps () {
    jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb')
    let dateval=moment(userBankDetails.date_of_birth).format("YYYY-MM-DD")
    this.setState({dateOfBirth:dateval})
    if(this.props.email)
    {
      if(this.props.email.Success===true)
        {
          thisRef.setState({ verifyEmailshow: false,
            withdrawEmailVerificationshow: true
          })
        }
    }
    
    
  }
  verifyEmail = () => {
    thisRef.setState({ verifyEmailshow: true })
  }
  renderPopup () {
    if (thisRef.state.verifyEmailshow) {
      return (
        <VerifyEmailId
          onPress={() => thisRef.setState({ verifyEmailshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  withdrawEmailVerification = () => {
    thisRef.setState({ withdrawEmailVerificationshow: true })
  }
  withdrawEmailVerificationPopup () {
    if (thisRef.state.withdrawEmailVerificationshow) {
      return (
        <WithdrawEmailVerification
          onPress={() =>
            thisRef.setState({ withdrawEmailVerificationshow: false })}
        />
      )
    } else {
      ;<span />
    }
  }
  phoneChangeAction () {
    thisRef.setState(
      {
        phoneChangeRequest: true
      },
      function () {
        let changeRequest={"phoneChangeRequest":thisRef.state.phoneChangeRequest}
        thisRef.props.submitPhoneChangeRequest(changeRequest)
      }
    )
  }
  handlePanCardChange (event) {
    thisRef.setState({ [event.target.name]: event.target.value })
  }
  handlePanCardSubmit (event) {
    event.preventDefault()
    if(thisRef.state.dateOfBirth)
    {
     thisRef.state.dateOfBirth = moment(thisRef.state.dateOfBirth).format("DD/MM/YYYY")
    }
    
    thisRef.props.submitPanCardForm(thisRef.state)
  }
  handleBankDetailsChange (event) {
    thisRef.setState({ [event.target.name]: event.target.value })
  }
  handleBankDetailsSubmit (event) {
    event.preventDefault()
    thisRef.props.submitBankDetailForm(thisRef.state)
  }
  backButtonRedirection(){
    Router.browserHistory.push('/AccountBalance') 
  }
  selectBox(){
   let datateri = ['MH','UP','JK','MP'];
  let Lists = datateri.map((item, i) => {
    return(
    <option value={item} key={i} selected={userBankDetails.territory==item}>{item}</option>
    )
   })
  return(
    <select className='form-control withdrawVerificationselectBox' name='stateTerritory' value={this.state.stateTerritory} onChange={this.handlePanCardChange}>
    <option></option>
    {Lists}
  </select>
  )
  }
// {/* onClick={this.withdrawEmailVerification} */}
  render () {
    if(jeetomoneystore.jeetomoney.userBankDetails==undefined)
    {
      userBankDetails=[]
    }
    else{
      userBankDetails=jeetomoneystore.jeetomoney.userBankDetails
    }
    let UserData=jeetomoneystore.jeetomoney.userdata;
    return (
      <div className='container-fluid withdrawVerificationScreen'>
        <div className='withdrawVerificationMainDiv'>
          {thisRef.renderPopup()}
          {thisRef.withdrawEmailVerificationPopup()}
          <div className='withdrawVerificationInnerDiv'>
            <div className='withdrawVerificationTopDiv'>
              <img
                src={WVPBankAccountDetailsImage}
                className='withdrawVerificationImages img img-responsive'
              />
            </div>

            <div className='withdrawVerificationTabView'>
              <div className='withdrawVerificationInnerTabView'>
                <Tabs>
                  <TabList>
                    <Tab>Contact Details</Tab>
                    <Tab>Pan Card</Tab>
                    <Tab>Bank Account Details</Tab>
                  </TabList>

                  <TabPanel>
                    <div className='withdrawVerificationTabNotes'>
                      <text>
                        You have to verify your phone number and Email address to carry out withdrawal request.
                      </text>
                    </div>
                    <div className='withdrawVerificationUserAccountTabPanel'>
                      <div className='withdrawVerificationPhoneDetails'>
                        <div className='withdrawVerificationPhoneLeft'>
                          <div className='withdrawVerificationPhoneLeftText'>
                            <text>
                              Phone Number: {UserData.phone_number_10_digits}
                            </text>
                          </div>
                        </div>
                        <div className='withdrawVerificationPhoneMiddle'>
                          <div className='withdrawVerificationPhoneMiddleText'>
                          {UserData.is_phone_verified ? <text className='withdrawVerificationPhoneMiddleVerifiedText'>VERIFIED</text> 
                            : <text className='withdrawVerificationPhoneMiddleNotVerifiedText'>NOT VERIFIED</text> }
                          {/* <text className={UserData.is_phone_verified? 'withdrawVerificationPhoneMiddleVerifiedText':'withdrawVerificationPhoneMiddleNotVerifiedText'}>
                            VERIFIED
                            </text>
                            <text> / </text>
                            <text className={UserData.is_phone_verified? 'withdrawVerificationPhoneMiddleNotVerifiedText':'withdrawVerificationEmailMiddleNotVerifiedText'}>
                              NOT VERIFIED
                            </text> */}
                          </div>
                        </div>
                        <div className='withdrawVerificationPhoneRight'>
                          <div
                            className='withdrawVerificationPhoneRightChange'
                            onClick={this.phoneChangeAction}
                          >
                            <SubmitButton name={this.state.phoneChangeButton} />
                          </div>
                        </div>
                      </div>
                      <div className='withdrawVerificationPhoneDetails'>
                        <div className='withdrawVerificationPhoneLeft'>
                          <div className='withdrawVerificationPhoneLeftText'>
                            <text>
                              Email: {UserData.user_email}
                            </text>
                          </div>
                        </div>
                        <div className='withdrawVerificationPhoneMiddle'>
                          <div className='withdrawVerificationPhoneMiddleText'>
                            {UserData.is_email_verified ? <text className='withdrawVerificationPhoneMiddleVerifiedText'>VERIFIED</text> 
                            : <text className='withdrawVerificationPhoneMiddleNotVerifiedText'>NOT VERIFIED</text> }
                          
                            {/* <text> / </text>
                            <text className={UserData.is_email_verified? 'withdrawVerificationPhoneMiddleNotVerifiedText':'withdrawVerificationEmailMiddleNotVerifiedText'}>
                              NOT VERIFIED
                            </text> */}
                          </div>
                        </div>
                        <div className='withdrawVerificationPhoneRight'>
                          <div
                            className='withdrawVerificationPhoneRightChange'
                            onClick={this.verifyEmail}
                          >
                            <SubmitButton name={this.state.emailChangeButton} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='withdrawVerificationPanCardTabPanel'>
                      <div className='withdrawVerificationPanCardInnerDiv'>
                      <form onSubmit={this.handlePanCardSubmit}>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Full Name
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='fullName'
                                onChange={this.handlePanCardChange}
                                placeholder={userBankDetails.pan_card_full_name}
                              />
                              <div>
                                <text className='withdrawVerificationInputSuggestion'>
                                  Your name must match the name on your pan CARD.
                                </text>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Father's Name
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='fatherName'
                                placeholder={userBankDetails.pan_card_father_name}
                                onChange={this.handlePanCardChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Date Of Birth
                              </label>

                            </div>
                          </div>
                          
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              {/* <DatePicker onChange={this.onChange} /> */}
                              <input
                                type='date'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='dateOfBirth'
                                value={this.state.dateOfBirth}
                                onChange={this.handlePanCardChange}
                              />
                              <div>
                                <text className='withdrawVerificationInputSuggestion'>
                                  Format-DD/MM/YYYY
                                </text>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                PAN Number
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control withdrawVerificationselectBox'
                                id='exampleFormControlInput1'
                                name='panNumber'
                                placeholder={userBankDetails.pan_card_number}
                                onChange={this.handlePanCardChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                State / Territory
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              {this.selectBox()}
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Upload PAN Card Photo
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              {/* <input
                                type='file'
                                className='form-control withdrawVerificationselectBox filestyle'
                                data-btnClass='btn-primary'
                                id='exampleFormControlInput1'
                                name='uploadPanCard'
                              /> */}
                              <div className='input-group image-preview'>
                                <input
                                  type='text'
                                  className='form-control image-preview-filename'
                                />
                                <span className='input-group-btn withdrawInputBtn'>
                                  <div className='btn btn-default image-preview-input'>
                                    <span className='image-preview-input-title'>
                                      ...Browse
                                    </span>
                                    <input
                                      type='file' 
                                      className='form-control withdrawVerificationselectBox filestyle'
                                      capture={true}
                                    />
                                  </div>
                                </span>
                              </div>
                              <text className='withdrawVerificationInputSuggestion'>
                                Please upload a clear PNG, JPEG, JPG or PDF of max 5MB.
                              </text>
                            </div>
                          </div>
                        </div>
                        <div className='withdrawVerificationPanCardSubmission'>
                          <SubmitButton type={'submit'}
                            name={this.state.bankAccountSubmitButton}
                          />
                        </div>
                        </form>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='withdrawVerificationPanCardTabPanel'>
                    <form onSubmit={this.handleBankDetailsSubmit}>
                      <div className='withdrawVerificationPanCardInnerDiv'>
                      <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Bank Name
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='bankName'
                                onChange={this.handleBankDetailsChange}
                                placeholder={userBankDetails.bank_Name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Bank Branch Name
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='bankBranchName'
                                onChange={this.handleBankDetailsChange}
                                placeholder={userBankDetails.bank_Branch_Name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Account Number
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='accountNumber'
                                onChange={this.handleBankDetailsChange}
                                placeholder={userBankDetails.account_number}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                Account Holder Name
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='accountHolderName'
                                onChange={this.handleBankDetailsChange}
                                placeholder={userBankDetails.account_holder_name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row panelInput'>
                          <div className='col-xs-4 col-sm-4 col-md-4  col-lg-4'>
                            <div className='form-group'>
                              <label
                                for='exampleFormControlInput1'
                                className='withdrawVerificationinputLabel'
                              >
                                IFSC Code
                              </label>

                            </div>
                          </div>
                          <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                id='exampleFormControlInput1'
                                name='ifscCode'
                                onChange={this.handleBankDetailsChange}
                                placeholder={userBankDetails.ifsc_code}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='withdrawVerificationBankAccountSubmitDiv'>
                        <SubmitButton type={'submit'}
                          name={this.state.bankAccountSubmitButton}
                        />
                      </div>
                      </form>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <div className='withdrawVerificationBottomView'>
              <div className='withdrawVerificationBottomViewLeft'>
                <img
                  src={Backbtn} onClick={this.backButtonRedirection}
                  className='withdrawVerificationBackBtnImages img img-responsive'
                />
              </div>
              <div className='withdrawVerificationBottomViewRight' />
            </div>
          </div>

        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    email: state.emailVerify
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({ submitPhoneChangeRequest,submitPanCardForm,submitBankDetailForm,getBankDetailsData}, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithdrawVerification)
