import React from 'react'
import Wrapper from '../assets/wrappers/StatItem'

const StatItems = ({color,bcg,count,icon,title}) => {
  return (
  <Wrapper color={color} bcg={bcg}>
    <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
    </header>
    <h4 className='title'>{title}</h4>
  </Wrapper>
  )
}

export default StatItems