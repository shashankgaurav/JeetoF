import React, { Component } from 'react'
import Settings from '../Images/setting.png'
import '../Stylesheets/ovalButton.css'

class ovalButton extends Component {
  handleClickButton () {}
  render () {
    console.log("oval button",this.props.buttonData);
    const isDivAvailable = this.props.buttonData.buttonCounter > 0
    let buttonCounterDiv = null
    if (isDivAvailable) {
      buttonCounterDiv = (
        <div className='butonCounter'>
          <span className='butonCounterText'>
            {this.props.buttonData.buttonCounter}
          </span>
        </div>
      )
    } else {
      buttonCounterDiv = <div />
    }
    return (
      <div className={this.props.buttonData.buttonClass}>
        {buttonCounterDiv}
        <div className='oval-button-img' />
      </div>
    )
  }
}
export default ovalButton
