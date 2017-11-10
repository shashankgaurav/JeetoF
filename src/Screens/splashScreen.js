import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../Stylesheets/splashScreen.css';
import moneyLogo from '../Images/jito_money_logo.png';
import {splashAction} from '../Actions/splashAction';


class SplashScreen extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount = () =>{
    this.props.splashAction();
  }

  componentWillReciveProps = () => {
    console.log(this.props);
  }

  routing = () =>{
    this.props.router.push('/IntroScreen');
  }


  render(){
    console.log("in render");
    console.log(this.props);
    if(this.props.responseMeta !== null && this.props.responseMeta.data !== undefined){
      this.routing();
    }

return(
    <div className = "container">
      <div className = "wrapper">
        <div className = "main_Background">
          <img src = {moneyLogo} className = "jito_money_logo" />
          <div className = "footer">
            <p className = "footer_text">All Rights Reserved &#9400; 2017</p>
          </div>
        </div>
      </div>
    </div>
  )
}
}


const mapStateToProps = (state) =>{
  return{
  responseMeta: state.splash
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    ...bindActionCreators({splashAction}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
