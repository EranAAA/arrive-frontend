import React from 'react'
import { useSelector } from 'react-redux'

import { StopTimeSearchList } from '../cmps/stop-time-search-list'

export const AppSearch = () => {

   const { results } = useSelector(({ arriveModule }) => arriveModule)

   return (
      <section className="app-search">
         <StopTimeSearchList results={results} />
      </section>
   )
}

