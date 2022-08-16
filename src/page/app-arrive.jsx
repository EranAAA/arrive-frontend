import React, { useEffect, useState, createContext } from 'react'

import { arriveService } from '../services/arrive.service'
import { ArriveFilter } from '../cmps/arrive-filter'

export const ArriveContext = createContext()

export const AppArrive = ({ filter }) => {

   const [arrives, setArrives] = useState()

   const getDataList = () => {
      return arrives[0].map((stations, idx) => (
         { id: idx, label: stations.stop_name }
      ))
   }

   useEffect(() => {
      loadArrives(filter)
   }, [filter])

   const loadArrives = async (filter = '') => {
      const arrives = await arriveService.query(filter)
      setArrives(arrives)
      console.log('arrives', arrives);
   }

   if (!arrives) return

   return (
      <section className="app-arrive">
         <ArriveContext.Provider value={{}}>
            <h1>כאן תדעו אם הרכבת מגיעה בזמן</h1>
            <ArriveFilter data={getDataList()}/>
         </ArriveContext.Provider>

      </section>
   )
}

