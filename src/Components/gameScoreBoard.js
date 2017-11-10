import React, { Component } from 'react'
import '../Stylesheets/gameScoreBoard.css'

class gameScoreBoard extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let scorePlateConfig = ''

    return (
      <div className='scorePanel'>
        <ul className='scoreList'>
          {this.props.scoreDetail.map(data => {
            const activeClass = data.active ? 'active' : ''
            if (data.answer === 0) {
              scorePlateConfig = 'scorePlate'
            } else if (data.answer === 1) {
              scorePlateConfig = 'scoreCorrect'
            } else if (data.answer === 2) {
              scorePlateConfig = 'scoreWrong'
            } else if (data.answer === '') {
              scorePlateConfig = ''
            }

            return (
              <li className={activeClass}>
                <span className='score'>{data.score}</span>
                <span className={scorePlateConfig} />
              </li>
            )
          })}

        </ul>
      </div>
    )
  }
}

export default gameScoreBoard
