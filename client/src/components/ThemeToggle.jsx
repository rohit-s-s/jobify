import React from 'react'
import {BsSunFill, BsMoonFill} from "react-icons/bs"
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboardContext } from '../hooks/useDashboardContext'

const ThemeToggle = () => {
    const {isDarkTheme, toggleDarkTheme} = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
        {
            isDarkTheme?<BsSunFill className="toggle-icon"/>:<BsMoonFill/>
        }
    </Wrapper>
  )
}

export default ThemeToggle