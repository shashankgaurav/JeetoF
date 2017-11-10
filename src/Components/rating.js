import React, { Component } from 'react'
import '../Stylesheets/rating.css'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class Rating extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Rater total={5} rating={this.props.ratingCount} interactive={false} />
      </div>
    )
  }
}
export default Rating
