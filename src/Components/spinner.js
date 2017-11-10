import React, { Component } from 'react';
// import { PulseLoader,ScaleLoader,SyncLoader,FadeLoader} from 'react-spinners';
import MDSpinner from "react-md-spinner";
import '../Stylesheets/spinner.css';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div>
                <div className="spinnerMask"></div>
                <div className="spinner">
                    <MDSpinner />
                </div>

            </div>
        )
    }

}
export default Spinner;