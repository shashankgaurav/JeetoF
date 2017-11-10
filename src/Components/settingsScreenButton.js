import React, { Component } from 'react'
import '../Stylesheets/settingsButton.css'

class SettingsButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      btnClassName : 'unSelectedBtn'
    }
    console.log(this.state);
  }

  render () {
    let button = null
    button = <div className='settingsButtonText'> {this.props.name}</div>
    return (
      <div className='selectedBtn'>
        {button}
      </div>
    )
  }

  // componentWillReceiveProps()
  // {
  //   if(this.props.settingsBtnDetails.selected !== undefined)
  //   {
  //     this.setState({
  //       btnClassName : 'selectedBtn'
  //     })
  //   }else
  //   {
  //     this.setState({
  //       btnClassName : 'unSelectedBtn'
  //     })
  //   }
  // }
}


export default SettingsButton
