import React, { Component } from 'react'
import '../Stylesheets/myProfileSelectionPopup.css'
import SubmitButton from '../Components/answerButton'
import closeicon from '../Images/closeicon.png'
// import MyProfileSelectionPopupComponent from '../Components/myProfileSelectionPopupComponent.js'
import SettingsPopupLayoutComponent from '../Components/settingsPopupLayoutComponent.js'


class MyProfilePopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // profileButtonLable: 'My Profile',
      // performanceButtonLable: 'My Performance',
      // show: false,
    }
  }
      // onClick = (e) => {
      //   // e.preventDefault()
      //   this.setState({ show: !this.state.show })
      //   // console.log(this.state)
      // }

  render () {
    {
      return (
        <SettingsPopupLayoutComponent/>
      )
    }
}
}

export default MyProfilePopup
