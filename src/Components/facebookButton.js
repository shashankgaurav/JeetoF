import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getFacebookDetails } from '../Actions/facebookAction';
import FacebookLogin from 'react-facebook-login';
let newthis
class Facebookbutton extends Component {
  constructor(props){
    super(props);
    newthis = this;   
  }


    responseFacebook(response) {

     console.log(response);
      const facebookLogin = { "firstName" : response.name.substr(0,response.name.indexOf(' ')),
      "lastName" : response.name.substr(response.name.indexOf(' ')+1),
      "facebookID" : response.id,
      "facebook_token" : response.accessToken,
      "profile_picture_url" : response.picture.data.url,
      "user_email": response.email}
      // "friendReferralCode": newthis.props.referral_code}
      // console.log(facebookLogin);
      newthis.props.getFacebookDetails(facebookLogin);
    }

    render() {
      // console.log('render',JSON.stringify(this.props));

      const { metadata } = this.props;
      return (
          <div className="facebook-button">
        <FacebookLogin
          appId="1555919378037266"
          autoLoad={false}
          fields="name,email,picture"
          cssClass="answerButtonText"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook}
        />
        </div>
      )
    }
  }
  
  // export default Facebookbutton;

  function mapStateToProps (state) {
    return{
      users : state
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return{
      ...bindActionCreators({getFacebookDetails}, dispatch)
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Facebookbutton);
  