import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Recaptcha from 'react-grecaptcha';


class Captchabutton extends Component {
    // specifying your onload callback function
    callback() {
        console.log('Done!!!!');
    };
    expiredCallback(response) {
        console.log(response+"expiredCallback");
    }
    // specifying verify callback function
    verifyCallback(response) {
        console.log(response);
    };


    render() {
        return (
            <div className="recaptcha-button">
                <Recaptcha
                    sitekey="6LcKUjQUAAAAAFgQNEQbWPXEACq2wlyep44dWNpT"
                    render="explicit"
                    callback={this.verifyCallback}
                    expiredCallback={this.expiredCallback}
                    className="customClassName"
                />
            </div>
        )
    }
}

export default Captchabutton;




