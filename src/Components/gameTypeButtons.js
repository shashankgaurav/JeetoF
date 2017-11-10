import React, { Component } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import '../Stylesheets/gameTypeButtons.css';
const Router = require('react-router')

class gameTypeButtons extends Component {
  constructor (props) {
    super(props)
  }
  renderCounter (data) {
    return (
      <div className='gameCounter'>
        <span className='gameCounterText'>{data.gameCounter}</span>
      </div>
    )
  }
  handleplayerTabLick (type) {
    Router.browserHistory.push('/RoomSelectionScreen')    
  }
 
  render () {
    return (
      <div className='gameTypeButonpanel'>
        {this.props.imagePath.map(data => {
          const isDataAvailable = data.gameCounter > 0
          let counterDiv = null
          if (isDataAvailable) {
            counterDiv = (
              <div className='gameCounter'>
                <span className='gameCounterText'>{data.gameCounter}</span>
              </div>
            )
          } else {
            counterDiv = <span />
          }
          return (
            <div
              className='gameTypeButton'
              key={data.gameType}
              onClick={key => this.handleplayerTabLick(data.gameType)}
            >
              {counterDiv}
              <img src={data.gameImage} className='gameTypeButtonImage' />
            </div>
          )
        })}
      </div>
    )
  }
}
export default gameTypeButtons
