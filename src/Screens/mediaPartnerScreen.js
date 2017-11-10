import React, { Component } from 'react'
import '../Stylesheets/mediaPartnerScreen.css'
import SubmitButton from '../Components/answerButton'
import { read_cookie } from 'sfcookies'
let cookeiesdata = read_cookie('cookeiesdata')
console.log(cookeiesdata.userdetailsStore)
console.log(typeof cookeiesdata.userdetailsStore)
class MediaPartnerScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      buttonName: 'Next'
    }
  }
  handleOnclick = () => {
    if (typeof cookeiesdata.userdetailsStore === 'undefined') {
              this.props.router.push('/LoginScreen')
    } else {
      if ((cookeiesdata.userdetailsStore.is_user_logged_in) && (!(cookeiesdata.userdetailsStore.is_phone_verified))) {
        this.props.router.push('/LoginScreen')
    }else{
      this.props.router.push('/HomeScreen')
    }
  }
}
  render () {
    return (
      <div className='container-fluid mediaScreen'>
        <div className='middleContainer'>
          <div className='mediaScreenPopupLayoutContainer' />
        </div>
        <div className='footer'>
          <div className='mediaScreenNext' onClick={this.handleOnclick}>
            <SubmitButton name={this.state.buttonName} />
          </div>
        </div>
      </div>
    )
  }
}
export default MediaPartnerScreen
