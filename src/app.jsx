import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './style/main.scss'

import { AppArrive } from './page/app-arrive'

export function App() {

   return (
      <div className='app'>
         <Routes>
            <Route path="/" element={<AppArrive />} />
         </Routes>
      </div>
   )
}

