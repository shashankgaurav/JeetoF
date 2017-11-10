import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../Components/header'
import RoomSelectionButton from '../Components/RoomSelectionButton'
import CardButton from '../Components/cardButton'
import { reactLocalStorage } from 'reactjs-localstorage'
import '../App.css'
import '../Stylesheets/RoomSelectionScreen.css'
import '../Stylesheets/header.css'
import '../Stylesheets/roomSelectionButton.css'

class RoomSelectionScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      buttonName: 'Next'
    }
  }
  render () {
    console.log(this.props)
    return (
      <div className='container-fluid mainBackground'>
        <div className='wrapper'>
          <div className='roomSelectionHeader'>
            <Header />
          </div>
          <div className='roomSelectionCardpanel'>
            <div className="roomSelect">
              <RoomSelectionButton />
            </div>
            <CardButton stage={1}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    facebookuser: state.facebook,
    loginuser: state.manualLogin,
    registeruser: state.register,
    screenTypes: state.switchReducer,
    responseMeta: state.splash,
    verifyUser: state.verify,
    homeScreenUserdata: state.homeScreen
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     ...bindActionCreators({ getProfileData }, dispatch)
//   }
// }
export default connect(mapStateToProps, null)(RoomSelectionScreen)
