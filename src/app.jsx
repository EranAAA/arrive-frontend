import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.scss'

import { AppHeader } from './cmps/app-header'
import { AppHome } from './page/app-home'
import { AppSearch } from './page/app-search'
import { AppArrive } from './page/app-arrive'

export function App() {

   return (
      <div className='app'>
         <AppHeader />
         <Routes>
            <Route path="/" element={<AppHome />} />
            <Route path="/search" element={<AppSearch />} />
            <Route path="/routes" element={<AppArrive />} />
         </Routes>
      </div>
   )
}

