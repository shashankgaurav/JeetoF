import React, { Component } from 'react'
import '../Stylesheets/answerButton.css'

class answerButton extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let button = null
    if (this.props.type == 'submit') {
      button = (
        <button type='submit' className='answerButtonText'>
          {this.props.name}
        </button>
      )
    } else {
      button = <div className='answerButtonText'>{this.props.name}</div>
    }
    return (
      <div className='answerButton'>
        {button}
      </div>
    )
  }
}

export default answerButton
