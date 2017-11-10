import React, { Component } from 'react'
import '../Stylesheets/languageSelectionScreen.css'
import Button from '../Components/answerButton'
import PopupLogo from '../Components/popupLayoutLogo'
import { updateLanguage } from '../Actions/languageAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reactLocalStorage } from 'reactjs-localstorage'
class languageSelection extends Component {
  constructor (props) {
    super(props)
    // this.state = {
    // }
  }
  componentDidMount = () => {
    let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
    console.log(jeetomoneydata);    
  }    

  selectLanguage = (event) => {
    console.log("zxcczzxkc");
    event.preventDefault()
    this.props.updateLanguage('1');
  }
  render () {
    return (
      <div className='languageSelectionWrapper'>
        <div className='popupLogolanguagePanel'>
          <div className='languageLogo'>
            
          </div>
         
          <div className='languageSelection'>
            <div className="languageMessage">Question will appear in selected language</div>
            <div
              className='languageType'
              id='1'
              onClick={this.selectLanguage}
            >
              <Button name={'English'} />
            </div>
            <div
              className='languageType'
              id='2'
              onClick={this.selectLanguage}
            >
              <Button name={'Hindi'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    facebookuser: state.facebook,
    loginuser: state.manualLogin,
    registeruser: state.register,
    screenTypes: state.switchReducer,
    responseMeta: state.splash,
    verifyUser: state.verify,
    phoneChangeRequest: state.withdrawVerification,
    languageset: state.language
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators(
      {
        updateLanguage
      },
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(languageSelection)
