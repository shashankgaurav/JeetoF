import React, { Component } from 'react'
import '../Stylesheets/FTURefferalCode.css'
import Button from '../Components/answerButton'
import PopupLogo from '../Components/popupLayoutLogo'
const Router = require('react-router')

class FTURefferalCode extends Component {
  constructor (props) {
    super(props)
  }
  showhomepage = () => {
    Router.browserHistory.push('/HomeScreen');
  }
  render () {
    return (
      <div className='FTURefferalCodeWrapper'>
        <div className='FTURefferalCodePanel'>
            <div className="closeReferelCode" onClick={this.showhomepage}></div>
          <div className='FTURefferalCodeLogo' />
          <div className='FTURefferalCodeText'>
            You and your friend can both earn  a free entry to Daily Jeeto Rs.1000 jackpot around if your friend signs up using below referrrel code
          </div>
          <div className='FTURefferalCodeInnerDiv'>
            <div className='codeWrapper'>
              <div className='codeText'>Referrel Code :</div>
              <div className='rCode'>fgdhk232kj</div>
            </div>
            <div className='refferCodeText'>
              *You can refer unlimited friends{' '}
            </div>
          </div>
          <div className="shareReferCodeButton">

          </div>
        </div>
      </div>
    )
  }
}
export default FTURefferalCode
