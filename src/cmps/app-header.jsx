import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BsSearch } from 'react-icons/bs'
import { FaTrain } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

export const AppHeader = () => {

   const navigate = useNavigate()

   return (
      <section className="app-header">
         <h1 onClick={() => navigate(`../`)}>זמני רכבת</h1>
         <nav>
            <Link to='/' ><AiFillHome/></Link>
            <Link to='/search' ><BsSearch /></Link>
            <Link to='/routes' ><FaTrain /></Link>
         </nav>
      </section >
   )
}

