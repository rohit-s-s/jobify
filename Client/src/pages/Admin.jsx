import React from 'react'
import Wrapper from "../assets/wrappers/StatsContainer"
import { useLoaderData } from 'react-router-dom'
import { StatItems } from '../components'
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'

const Admin = () => {
  const {users,jobs} = useLoaderData()
  return (
    <Wrapper>
      <StatItems title="current-user" count={users} color="#e9b949" bcg="#fcefc7" icon={<FaSuitcaseRolling/>}/>
      <StatItems title="total jobs" count={jobs} color="#647acb" bcg="#fcefc7" icon={<FaCalendarCheck/>}/>
    </Wrapper>
  )
}

export default Admin