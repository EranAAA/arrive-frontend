import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { BsSearch } from 'react-icons/bs'
import { FaTrain } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

export const AppHeader = () => {

   const navigate = useNavigate()

   return (
      <section className="app-header">
         <h1 onClick={() => navigate(`../`)}>זמני רכבת</h1>
         <nav>
            <NavLink to='/' ><AiFillHome/></NavLink>
            <NavLink to='/search' ><BsSearch /></NavLink>
            <NavLink to='/routes' ><FaTrain /></NavLink>
         </nav>
      </section >
   )
}

