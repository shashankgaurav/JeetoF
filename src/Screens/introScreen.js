import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../Stylesheets/introScreen.css'
import SubmitButton from '../Components/answerButton'
import { reactLocalStorage } from 'reactjs-localstorage'
let jeetomoneystore = reactLocalStorage.getObject('jeetomoneydataweb');
console.log(jeetomoneystore)
class IntroScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      buttonName: 'Next'
    }
    let metadata = reactLocalStorage.getObject('jeetomoneydataweb')
    console.log(metadata)
  }

    handleOnclick = () => {
        this.props.router.push('/MediaPartnerScreen');
    }
  render () {
      const a =<div className="optionDiv "><div className="optionIndex col-lg-2 col-md-2 col-sm-2 col-xs-2">A:</div><div className="optionText col-lg-10 col-md-10 col-sm-10 col-xs-10">Option One</div></div>;
    return (
      <div className='container-fluid introScreen'>
        <div className='middleContainer'>
          <div className='introScreenPopupLayoutContainer' />
        </div>
        
        <div className='footer'>
             
          <div className='introScreenNext' onClick={this.handleOnclick}>
           
            <SubmitButton name={this.state.buttonName} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(IntroScreen)
