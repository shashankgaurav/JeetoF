import React, { Component } from 'react'
import '../Stylesheets/myProfileSelectionPopup.css'
import SubmitButton from '../Components/answerButton'
import closeicon from '../Images/closeicon.png'
import ShowSelectedPopupComponent from '../Components/showSelectedPopupComponent'

class SettingsPopupLayoutComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profileButtonLable: 'My Profile',
      performanceButtonLable: 'My Performance',
      popUpName : 'MyProfileSelectionPopUp',
      // popUpName : 'MySettingsPopUp',
      show: false,
    }
  }
  onClick = (e) => {
    e.preventDefault()
    this.setState({ show: !this.state.show })
  }

  render () {
    return (
      <div className='row'>
        <div>
          <ShowSelectedPopupComponent popupDetails = {this.state}/>
          <div className='myProfilePopupCloseBtnView'>
            <img
              onClick={this.props.close}
              src={closeicon}
              className='img img-responsive myProfilePopupCloseImg'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsPopupLayoutComponent
