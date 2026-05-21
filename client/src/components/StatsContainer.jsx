import React from 'react'
import Wrapper from '../assets/wrappers/StatsContainer'
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'
import StatItems from './StatItems'

const StatsContainer = ({defaultStatus}) => {
    const stats = [
        {
        title:" Pending applications",
        count:defaultStatus?.pending || 0,
        icon:<FaSuitcaseRolling/>,
        color:"#f59e0b",
        bcg:"#fef3c7"
    },
        {
        title:"Interviews scheduled",
        count:defaultStatus?.interview || 0,
        icon:<FaCalendarCheck/>,
        color:"#647acb",
        bcg:"#e0e8f9"
    },
        {
        title:"Jobs declined",
        count:defaultStatus?.declined || 0,
        icon:<FaBug/>,
        color:"#d66a6a",
        bcg:"#ffeeee"
    },
]
  return (
    <Wrapper>
        {
            stats.map((item)=>(
                <StatItems key={item.title} {...item}/>
            ))
        }
    </Wrapper>
  )
}

export default StatsContainer