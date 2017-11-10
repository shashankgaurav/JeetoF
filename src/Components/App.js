import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addUser, deleteUser, deleteAll} from '../Actions/loginAction';
import '../Stylesheets/App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user: ''
    }
  }

  addUserName = () => {
    console.log(this.state, this.props);
    this.props.addUser(this.state.user);
  }

  render(){
    return(
      <div className = "container">
        <div className = "wrapper">
          <input
          className = "username-input"
          type= "text"
          placeholder = "I have too..."
          onChange = { event => this.setState({user: event.target.value}) }
          onKeyPress = { event => {
            if (event.key === 'Enter')
            {this.addUserName()}
          }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return{
  users: state
  }
}

function mapDispatchToProps(dispatch) {
  return{
    ...bindActionCreators({addUser, deleteUser, deleteAll}, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
