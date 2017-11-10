import React, { Component } from 'react'
import '../Stylesheets/myProfilePopup.css'
import SubmitButton from '../Components/answerButton'
import closeicon from '../Images/closeicon.png'

class MyProfilePopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profileButtonLable: 'My Profile',
      performanceButtonLable: 'My Performance',
      show: false,
    }
  }
  onClick = (e) => {
    // e.preventDefault()
    console.log('abcdefgh')
    this.setState({ show: !this.state.show })
    // console.log(this.state)
  }

  render () {
    if(this.state.show){
    return (
      <div className='row'>
        <button onClick={this.onClick}>Click</button>
        <div>
        <div className='myScreenBackground'>
          <div className='buttonsContainer'>
            <div className='myProfileTopDiv' />
            <div className='myProfileMiddleDiv'>
              <div className='buttonsContainer'>
                <div className='row myProfileButtonDiv'>
                  <SubmitButton name={this.state.profileButtonLable} />
                </div>
                <div className='row myProfileBlankDiv' />
                <div className='row myPerformanceButtonDiv'>
                  <SubmitButton name={this.state.performanceButtonLable} />
                </div>
              </div>
            </div>
            <div className='myProfileBottomDiv' />
          </div>
          </div>
          <div className='myProfilePopupCloseBtnView'>
            <img
              onClick={this.onClick}
              src={closeicon}
              className='img img-responsive myProfilePopupCloseImg'
            />
          </div>
     </div>
      </div>
    )
  }else{
    return (
      <button onClick={this.onClick}>Click</button>
    )
  }
}
}

export default MyProfilePopup
