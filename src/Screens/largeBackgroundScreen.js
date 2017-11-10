import React, { Component } from 'react';
import '../Stylesheets/largeBackground.css'
import LargeBackgroundComponent from '../Components/largeBackgroundComponent.js';
import { connect } from 'react-redux';
import { store } from "../store.js";

class LargeBackgrounScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenName: 'myProfile'
        }
    }
    
    render() {
        return (
            <div className="container-fluid backgroundFullScreen">
                <LargeBackgroundComponent screenName={this.props.location.state.screenName}/>
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
export default connect(mapStateToProps, null)(LargeBackgrounScreen);