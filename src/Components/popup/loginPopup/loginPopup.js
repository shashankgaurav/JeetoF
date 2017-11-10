import React, { Component } from 'react';
import './loginPopup.css';

class LoginPopup extends Component {
    render() {
        return (

            <div className="loginPopupContainer">
                <div className="jitoMoneyLogoContainer">
                    <div className="jitoMoneyLogo">
                        <img src="images/jitoMoney.png" className="img img-responsive"/>
                    </div>
                </div>
                <div className="loginTab">
                    <div className="buttons">
                        <div className="facebook">
                        </div>
                        
                    </div>
                    <div className="termsAndCondition row">
                        <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4">
                            <div className="checkBox">
                            </div>
                        </div>
                        <div className="col-md-8 col-xs-8 col-sm-8 col-lg-8">
                            <div className="terms">
                                I accept terms and conditions
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
export default LoginPopup;