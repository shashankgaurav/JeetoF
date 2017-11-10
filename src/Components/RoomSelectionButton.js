import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-image-slider';
import '../Stylesheets/roomSelectionButton.css';
import { reactLocalStorage } from 'reactjs-localstorage';
import  { buttonSelect, roomSelect, setcarddata} from '../Actions/buttonSelectAction';
import { read_cookie, bake_cookie } from 'sfcookies';
import axios from 'axios';
let cookeiesdata 
let jeetomoneydata
// import  { winAction, playerAction } from '../Actions/textAction';
const _ = require('lodash');


class RoomSelectionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            roomTypes: [],
            Lists: [],
            previousTarget: null,
            prevId: null,
            classNameimage: '',
            handleClickcall: ''
        }

      //  this.handleClick = this.handleClick.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
    }
    componentWillMount = () => {
      jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb')
      cookeiesdata = read_cookie('cookeiesdata')
      this.props.roomSelect(10);
      
   }

    handleClick = (event) => {
      if (this.state.previousTarget !== null) {
        this.state.previousTarget.classList.remove("roomselection-button-active");
      }
      event.currentTarget.classList.add("roomselection-button-active");
      this.setState({previousTarget: event.currentTarget});
        const row = event.currentTarget.id;
        this.props.roomSelect(row);
        jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
        const  roomTypes = _.orderBy(_.filter(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, {entry_fee_in_Rs: parseInt(row)}), ['is_jackpot'], ['asc']);
        let states = []
        let winner = [];
        let player = [];
        roomTypes.forEach(function (rooms) {
        const temp = _.map(rooms.payTable, 'winning_amount')
            winner.push(rooms.number_of_winners);
            player.push(rooms.number_of_players);
        let data1 = temp[0];
        if(this.state.prevId === null && this.state.prevId !== row){
          this.setState({prevId: row});
          if(data1 === undefined){
            this.setState({Lists: []}, () =>{
            });
          }
        else if(data1 !== undefined)
        states.push(data1);
      }else{

        this.setState({prevId: row});

          this.setState({Lists: []}, () =>{
          });

            if(data1 !== undefined)
            states.push(data1);

            // this.state.Lists=[];

      }

      }.bind(this))
      let carddata = {
        winner: winner,
        player: player
      }
      this.props.setcarddata(carddata);
      this.setState({Lists: states}, () =>{
        this.props.buttonSelect(this.state.Lists);

      });

      // this.setState({Lists:states});


      }


      findcode(item, arr){
        var i=0;
        var idx = arr.indexOf(item);  //search array for whatever the user input was
        if(idx >=0 && idx <= arr.length) { // check index is in array bounds
            return arr[i+1]; // return whatever comes next to item
        }else{
          return arr[i];
        }
        return '';
    }

    render() {
      let jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
      var data = _.uniq(_.map(jeetomoneydata.jeetomoney.metadata.roomConfig[0].roomType, 'entry_fee_in_Rs'))
      var item1 = jeetomoneydata.jeetomoney.userdata.masterPlayerGameStatistics.max_amount_played; // from user input
      var arr1 = data;
     let dataresulGet = this.findcode(item1, arr1);
     data.push("200", "300", "400", "500");
        const Lists = data.map((item, i) => {
          // if(item <= dataresulGet){
          //   this.setState(
          //     {
          //       classNameimage: 'roomselection-button',
          //       handleClickcall: 'this.handleClick'
          //     })
          // }else{
          //   this.setState(
          //     {
          //       classNameimage: 'roomselection-button-disable',
          //       handleClickcall: ''
          //     })
          // }
          console.log(item)
          if(i==0 && (this.state.previousTarget == null || item == dataresulGet)){
            console.log("in if condition")
           return (
            <ul key = {i}>
              <li>
              {(item <= dataresulGet) ? <div className="roomselection-button roomselection-button-active" id={item} onClick = {this.handleClick} >
                    <div className="roomselection-button-text" key = {i}>Rs {item}</div>
              </div> :  <div className="roomselection-button-disable" id={item}  >
                    <div className="roomselection-button-text" key = {i}>Rs {item}</div>
              </div>}
              </li>
            </ul>
        )
      }else{
        // if(!cookeiesdata.userdetailsStore.firstUserExperience){
          return (
            <ul key = {i}>
              <li>
              {(item <= dataresulGet && !(cookeiesdata.userdetailsStore.firstUserExperience)) ? <div className="roomselection-button" id={item} onClick = {this.handleClick} >
              <div className="roomselection-button-text" key = {i}>Rs {item}</div>
              </div> :  <div className="roomselection-button-disable" id={item}  >
              <div className="roomselection-button-text" key = {i}>Rs {item}</div>
              </div>}
              </li>
            </ul>
        )
        // }
      }
      });


        return (
            <div>
            <Slider Lists={Lists} isInfinite >
              {Lists.map((list, i) => <div key={i}>{list} </div>)}
            </Slider>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
      facebookuser: state.facebook,
      loginuser: state.manualLogin,
      registeruser: state.register,
      screenTypes: state.switchReducer,
      responseMeta: state.splash,
      verifyUser: state.verify,
      homeScreenUserdata: state.homeScreen,
    }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    ...bindActionCreators({buttonSelect, roomSelect, setcarddata}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelectionButton);
