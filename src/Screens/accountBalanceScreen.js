import React, { Component } from 'react';
import '../Stylesheets/accountBalanceScreen.css';
import PopupLayout from '../Components/popupLayout.js';
import { connect } from 'react-redux';
import { store } from "../store.js";

class AccountBalanceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenType: 'accountBalance'
        }
    }
    render() {
        return (
                <div className="container-fluid accountBalanceContainer">
                    <div className="middleScreen">
                        <PopupLayout panelType={this.state.screenType} />
                    </div>
                </div>
                )
        }
}

function mapStateToProps(state) {
    return {
        screenType: state
    }
}

// mapDispatchToProps = (dispatch) = {
// }
export default connect(mapStateToProps, null)(AccountBalanceScreen);