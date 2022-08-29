import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './style/main.scss'

import { AppHeader } from './cmps/app-header'
import { AppHome } from './page/app-home'
import { AppSearch } from './page/app-search'
import { AppArrive } from './page/app-arrive'

import { loadSiri, loadArrives, loadSavedRoutes } from './store/arrive/arrive.action'

export function App() {

   const dispatch = useDispatch()

   useEffect(() => {
      loadSiriData()
   }, [])

   const loadSiriData = async () => {
      await dispatch(loadSiri())
      await dispatch(loadArrives())
      await dispatch(loadSavedRoutes())
   }

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

