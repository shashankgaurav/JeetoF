import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import './payTablePopup.css';
import Popup from './images/PopupScreen.png';
class PayTablePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    show() {
        this.setState({ show: true })
    }

    close() {
        this.setState({ show: false })
    }
    

    render() {
        var myBigGreenDialog = {
            backgroundImage: `url(${Popup})`,
            color: '#ffffff',
            width: '60%',
            height: '500px',
            marginTop: '-250px',
            marginLeft: '-25%',
            backgroundSize: '100% 100%'
        };
        var closeButtonStyle1= {
            cursor: 'pointer',
            position: 'absolute',
            fontSize: '1.8em',
            right: '15px',
            top: '0'
          }

        return (
            <SkyLight dialogStyles={myBigGreenDialog} closeButtonStyle={closeButtonStyle1} hideOnOverlayClicked ref={ref => this.customDialog = ref}>
                    <div className="mainPopUpBoxDiv">
                        <div className="innerMainDiv">
                            <div className="leftDiv">
                                <text>Entry Fee Rs</text>
                            </div>
                            <div className="middleDiv">

                            </div>
                            <div className="rightDiv">
                            <text>10</text>
                            </div>
                        </div>
                        <div className="innerMainDiv">
                            <div className="leftDiv">
                                <text>No of Videos</text>
                            </div>
                            <div className="middleDiv">

                            </div>
                            <div className="rightDiv">
                            <text>04</text>
                            </div>
                        </div>
                        <div className="innerMainDiv">
                            <div className="leftDivWithoutBorder">
                                <text># of Questions</text>
                            </div>
                            <div className="middleDivWithoutBorder">

                            </div>
                            <div className="rightDivWithoutBorder">
                            <text>12</text>
                            </div>
                        </div>
                        <div className="innerMainDiv">
                            <div className="leftDiv">
                                <text># of Players</text>
                            </div>
                            <div className="middleDiv">

                            </div>
                            <div className="rightDiv">
                            <text>06</text>
                            </div>
                        </div>
                        <div className="innerMainDiv">
                            <div className="leftDiv">
                                <text># of Winners</text>
                            </div>
                            <div className="middleDiv">

                            </div>
                            <div className="rightDiv">
                            <text>03</text>
                            </div>
                        </div>
                        <div className="innerMainDiv">
                            <div className="leftDiv">
                                <text>Rank 1 wins</text>
                            </div>
                            <div className="middleDiv">

                            </div>
                            <div className="rightDiv">
                            <text>Rs XXXX</text>
                            </div>
                        </div>
                        <div className="innerMainDiv">
                            <div className="leftDiv">
                                <text>Rank 2 wins</text>
                            </div>
                            <div className="middleDiv">

                            </div>
                            <div className="rightDiv">
                            <text>Rs XXXX</text>
                            </div>
                        </div>
                        <div className="innerMainDiv">
                            <div className="leftDivWithoutBorder">
                                <text>Rank 3 wins</text>
                            </div>
                            <div className="middleDivWithoutBorder">

                            </div>
                            <div className="rightDivWithoutBorder">
                            <text>Rs XXXX</text>
                            </div>
                        </div>
                    </div>
                </SkyLight>
        )
    }
}
export default PayTablePopup;