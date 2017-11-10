import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import homeBtn from '../Images/settingsmin.png';
import shareBtn from '../Images/shareReferralCode.png';
import notificationHeaderImg from '../Images/notificationHeader.png';
import notificationBackBtn from '../Images/notificationBackBtnMin.png';
import myPerformanceHeaderImg from '../Images/myPerformance.png';
import userProfileImg from '../Images/IMG_5368.JPG';
import multiplayerImage from '../Images/multiplayerImage.png';
import singleplayerImage from '../Images/singleplayerImage.png';
import myProfile from '../Images/myProfile.png';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../Stylesheets/largeBackground.css';
import '../Stylesheets/notificationScreen.css';
import '../Stylesheets/myPerformanceScreen.css';
import '../Stylesheets/myProfileScreen.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import Rating from '../Components/rating'
import {notificationAction} from '../Actions/notificationAction';
let notificationList
const Router = require('react-router');

class LargeBackgroundComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () =>{
      console.log("notification componentDidMount")
      this.props.notificationAction();
    }
  
    componentWillReciveProps = () => {
      console.log("hello shital its notification");
    }

    handleOnclick = () => {
      Router.browserHistory.push('/HomeScreen')
    }

    goToBackScreen = () => {
      this.props.router.push('/HomeScreen');
}


    renderScreenConditionaly () {
        switch (this.props.screenName){
        case 'notifications':
          return this.renderNotificationScreen()
        case 'myProfile':
          return this.renderMyProfileScreen()
        case 'myPerformance':
          return this.renderMyPerformanceScreen()
      }
    }

    render () {
      // console.log("render screen")
      // console.log(this.props.notificationResponse.rows)
      return (
          <div className='largeBackgroundImgContainer'>
            <div className='largeBackgroundImg'>
             {this.renderScreenConditionaly()}
            </div>
          </div>
      )
    }

    renderNotificationScreen()
    {
      let allNotifications = this.props.notificationResponse.rows;
      let notificationList

    
      if(this.props.notificationResponse.length!=0)
      {
        notificationList = allNotifications.map((item, i)=>{
          return(
          <div className='row transparent_bg'>
                <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>{item.text_notification_message}</div>
                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>{item.createdAt}</div>
          </div>
        )})
      }
      
      return(
      <div>
              <div className='row notificationHeader'>
                <img src={notificationHeaderImg}/>
              </div>
              <div className='row allNotifications'>
                {notificationList}
                  {/* <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div>
                  <div className='row transparent_bg'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 notificationTitle'>10 Bonus points added to your account</div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 notificationTime'>1 hr ago</div>
                  </div> */}
              </div>
              <div className='row notificationBackBtn'>
                <img src={notificationBackBtn} onClick = {this.goToBackScreen}/>
              </div>
      </div>
      )
    }


    renderMyPerformanceScreen(){

        const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
        const user = jeetomoneydata.jeetomoney.userdata;
        const performance = jeetomoneydata.jeetomoney.performanceData;
        {(performance.total_number_of_questions_answered) ?  performance.total_number_of_questions_answered : performance.total_number_of_questions_answered = 1}
        const per_of_right_questions = ((performance.number_of_questions_answered_correctly/performance.total_number_of_questions_answered)*100);

      const cardSlide1 = (
        <div className='row twoCardContainer'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 cardBackgroundImage'>
                <div className='myPerformanceSinglePlayerContainer col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                  <div className='myPerformancePrizeAmount'>Rs. 20</div>
                  <div className='singlePlayerImage'><img src={singleplayerImage} /></div>
                  <div className='myPerformanceWinnerName'>Narendra Sharma</div>
                  <div className='cardSharebtn'><img src={shareBtn}/></div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 cardBackgroundImage'>
                <div className='myPerformanceSinglePlayerContainer col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                  <div className='myPerformancePrizeAmount'>Rs. 20</div>
                  <div className='multiplayerImage'><img src={multiplayerImage} /></div>
                  <div className='myPerformanceWinnerName'>Narendra Sharma</div>
                  <div className='cardSharebtn'><img src={shareBtn}/></div>
                </div>
              </div>
        </div>
      );

      const cardSlide2 = (
        <div className='row twoCardContainer'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 cardBackgroundImage'>
                <div className='myPerformanceSinglePlayerContainer col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                  <div className='myPerformancePrizeAmount'>Rs. 20</div>
                  <div className='singlePlayerImage'><img src={singleplayerImage} /></div>
                  <div className='myPerformanceWinnerName'>Narendra Sharma</div>
                  <div className='cardSharebtn'><img src={shareBtn}/></div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 cardBackgroundImage'>
                <div className='myPerformanceSinglePlayerContainer col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                  <div className='myPerformancePrizeAmount'>Rs. 20</div>
                  <div className='multiplayerImage'><img src={multiplayerImage} /></div>
                  <div className='myPerformanceWinnerName'>Narendra Sharma</div>
                  <div className='cardSharebtn'><img src={shareBtn}/></div>
                </div>
              </div>
        </div>
      );

      const images = [
        cardSlide1,
        cardSlide2
      ]
      return(
          <div>
            <div className='row performanceHeaderContainer'>
              <div className='userImgContainer col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                  {(user.profile_picture_url) ? <img src={user.profile_picture_url} className='myPerformanceScreenUserImg'/> : <img src={userProfileImg} />}
              </div>
              <div className='peformanceHeadingImg col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                <img src={myPerformanceHeaderImg}/>
              </div>
            </div>
            <div className='row graphMainRow'>
              <div className='row graphFirstRow'>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 graphImg'>
                    # of games <br/> Played
                    <div className = "text_for_card">
                      {performance.number_of_games_played}
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 graphImg'>
                    # of games <br/> won
                    <div className = "text_for_card">
                      {performance.number_of_games_won}
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 graphImg'>
                    # of <br/> jackpot <br/> win
                    <div className = "text_for_card">
                      {performance.number_of_jackpots_won}
                    </div>
                </div>
              </div>
              <div className='row graphFirstRow'>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 graphImg'>
                  # of questions <br/> answered <br/> correctly
                  <div className = "text_for_card">
                    {per_of_right_questions+' %'}
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 graphImg'>
                    fastest <br/> answer <br/> time <br/>
                    <text className='textColor'>{performance.fastest_answer_time}</text>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 graphImg'>
                  total <br/> winning <br/> amount <br/>
                  <text className='textColor'>{performance.total_winning_amount}</text>
                </div>
              </div>
            </div>
            <div className='row sliderDivContainer'>
                <div className='carouselContainer col-lg-10 col-md-10 col-sm-10 col-xs-10'>
                      <CarouselProvider
                        naturalSlideWidth={100}
                        naturalSlideHeight={15}
                        totalSlides={2}
                      >
                      <div className='carouselButtons'>
                        <ButtonBack />
                        <ButtonNext />
                      </div>

                      <Slider>
                        <Slide index={0}>{images[0]}</Slide>
                        <Slide index={1}>{images[1]}</Slide>
                      </Slider>

                    </CarouselProvider>
                </div>
                <div className='myPerformanceFooter'>
                    <img src={homeBtn} onClick = {this.handleOnclick}/>
                </div>
          </div>
          </div>
      )
    }

    renderMyProfileScreen()
    {
      const jeetomoneydata = reactLocalStorage.getObject('jeetomoneydataweb');
      const user = jeetomoneydata.jeetomoney.userdata;

      return(
                <div>
                    <div className='row myProfileHeader'>
                      <div className='myProfileImageContainer col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                        <div className="userProfileImgWrapper">
                          <img src={user.profile_picture_url} className='myProfileScreenUserImg img img-thumbnail'/>
                        </div>
                        <div className="ratingProfile">
                          <Rating ratingCount={user.masterPlayerGameStatistics.skill_star_rating}/>
                        </div>
                      </div>
                      <div className='myProfileHeaderImg col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                        <img src={myProfile}/>
                      </div>
                    </div>
                    <div className='myProfileDetails'>
                    <div className='profileDetailsRow'>
                    <div className='myProfileDetailsLeftDiv'>
                        <div className='rowContent'>
                            <div className='innerDivLable'>First Name : {user.firstName}</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>Narendra</div>*/}
                        </div>
                    </div>
                    <div className=' myProfileDetailsRightDiv'>
                    <div className='rowContent'>
                            <div className='innerDivLable'>Last Name : {user.lastName}</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>sharma</div>*/}
                        </div>
                    </div>
                    </div>
                    <div className='profileDetailsRow'>
                    <div className='myProfileDetailsLeftDiv'>
                    <div className='rowContent'>
                            <div className='innerDivLable'>Username : {(user.username) ? user.username : 'NA'}</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>Naren</div>*/}
                        </div>
                    </div>
                    <div className=' myProfileDetailsRightDiv'>
                    <div className='rowContent'>
                            <div className='innerDivLable'>Age : {(user.age) ? user.age : 'NA' }</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>27yrs</div>*/}
                        </div>
                    </div>
                    </div>
                    <div className='profileDetailsRow'>
                    <div className=' myProfileDetailsLeftDiv'>
                    <div className='rowContent'>
                            <div className='innerDivLable'>Gender : {(user.gender) ? user.gender : 'NA'}</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>Male</div>*/}
                        </div>
                    </div>
                    <div className=' myProfileDetailsRightDiv'>
                    <div className='rowContent'>
                            <div className='innerDivLable'>Phone : {(user.phone_number_10_digits) ? user.phone_number_10_digits : 'NA'}</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>9845136982</div>*/}
                        </div>
                    </div>
                    </div>
                    <div className='profileDetailsRow'>
                    <div className=' myProfileDetailsLeftDiv'>
                    <div className='rowContent'>
                            <div className='innerDivLable'>Email : {(user.user_email) ? user.user_email : 'NA'}</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>narendra@gmail.com</div>*/}
                        </div>
                    </div>
                    <div className='myProfileDetailsRightDiv'>
                    <div className='rowContent'>
                            <div className='innerDivLable'>My Referral Code : {user.referral_code}</div>
                            {/*<div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 innerDivContent'>tyrfhg456*/}
                            <div className='referralCodesharebtn'><img src={shareBtn}/></div>
                            {/*</div>*/}
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className='myProfileFooter'>
                        <div className='homeBtn'>
                            <img src={homeBtn} onClick = {this.handleOnclick}/>
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (state) =>{
  return{
    notificationResponse: state.notification
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    ...bindActionCreators({notificationAction}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LargeBackgroundComponent);

// export default LargeBackgroundComponent;
