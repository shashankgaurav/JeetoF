import React, { Component } from 'react'
import Header from '../Components/header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router';
import '../Stylesheets/infoLinkScreen.css'
import Homebtn from '../Images/homebtn.png'
import SubmitButton from '../Components/answerButton'
const Router = require('react-router')

class InfoLinkScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tutorial: 'Tutorial',
      termsOfUse: 'Terms of Use',
      privacyPolicy: 'Privacy policy',
      contactUs: 'Contact Us',
      aboutUs: 'About Us'
    }
  }

  openTutorialPage = () => {
    window.open('');
  }

  openAboutUsPage = () => {
    window.open('https://s3.ap-south-1.amazonaws.com/jeetomoneyuserdata/policy/aboutus.html');
  }

  openTermsOfUsePage = () => {
    window.open('https://s3.ap-south-1.amazonaws.com/jeetomoneyuserdata/policy/termsandconditions.html');
  }
  openPrivacyPolicyPage = () => {
    window.open('https://s3.ap-south-1.amazonaws.com/jeetomoneyuserdata/policy/Privacy_Policy.html');
  }
  openContactUsPage = () => {
    window.open('mailto:care@jeetomoney.com');
  }

  handleOnclick = () => {
    console.log("working", this.props);
    this.props.router.push('/HomeScreen');
    }

  render () {
    return (
      <div className="container-fluid infoScreenBackground">
        <div className = "infoScreenHeader">
          <Header />
        </div>
        <div className='infoLinksContainer'>
          <div className='linkButtons' onClick={this.openTutorialPage}> <SubmitButton name={this.state.tutorial}/></div>
          <div className='linkButtons' onClick={this.openAboutUsPage}> <SubmitButton name={this.state.aboutUs}/></div>
          <div className='linkButtons' onClick={this.openTermsOfUsePage}> <SubmitButton name={this.state.termsOfUse}/></div>
          <div className='linkButtons' onClick={this.openPrivacyPolicyPage}> <SubmitButton name={this.state.privacyPolicy}/></div>
          <div className='linkButtons' onClick={this.openContactUsPage}> <SubmitButton name={this.state.contactUs}/></div>
        </div>
        <div className='infoLinksFooter' onClick = {this.handleOnclick}>
            <img src={Homebtn} />
        </div>
      </div>
    )
  }
}
export default InfoLinkScreen
