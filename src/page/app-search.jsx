import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { utilService } from '../services/util.service'
import { ArriveFilter } from '../cmps/arrive-filter'
import { StopTimeSearchList } from '../cmps/stop-time-search-list'

export const ArriveContext = createContext()

export const AppSearch = () => {

   const { results } = useSelector(({ arriveModule }) => arriveModule)

   return (
      <section className="app-search">
         <StopTimeSearchList results={results} />
      </section>
   )
}

