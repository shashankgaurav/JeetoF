import React, { Component } from 'react';
import '../Stylesheets/gameScreenButton.css';
import regularButton from '../Images/regularButton.png';
import selectButton from '../Images/selectButton.png';
import correctButton from '../Images/correctAnswer.png';
import wrongButton from '../Images/wrongButton.png';
class gameScreenButton extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className='gameScreenButton'>
          <img src={this.props.buttonImg} className="img img-responsive" />
        <div className='gameScreenButtonText'>{this.props.buttonContent}</div>
      </div>
    )
  }
}

export default gameScreenButton;
