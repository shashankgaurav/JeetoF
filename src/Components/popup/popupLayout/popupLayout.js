import React, { Component } from 'react';
import './popupLayout.css';
import TabContainer from "../../tabContainer/tabContainer.js";
import PopupLayoutLogo from "../../popupLayoutLogo/popupLayoutLogo.js";

class popupLayout extends Component {
    render() {
        return (

            <div className="popupLayoutContainer">
               <PopupLayoutLogo/>
               <TabContainer/>
            </div>

        )
    }
}
export default popupLayout;