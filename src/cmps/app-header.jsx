import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const AppHeader = () => {

   const navigate = useNavigate()

   return (
      <section className="app-header">
         <h1 onClick={() => navigate(`../`)}>זמני רכבת</h1>
         <nav>
            <Link to='/' >דף הבית</Link>
            <Link to='/search' >תוצאות חיפוש</Link>
            <Link to='/routes' >מעקב</Link>
         </nav>
      </section >
   )
}

