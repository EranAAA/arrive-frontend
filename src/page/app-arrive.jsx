import React, { useEffect, useState, createContext } from 'react'

import { arriveService } from '../services/arrive.service'

export const ArriveContext = createContext()

export const AppArrive = ({ filter }) => {

   const [arrives, setArrives] = useState()

   useEffect(() => {
      loadArrives(filter)
   }, [filter])

   const loadArrives = async (filter = '') => {
      const arrives = await arriveService.query(filter)
      setArrives(arrives)
      console.log('arrives', arrives);
   }


   // if (!arrives) return

   return (
      <section className="app-arrive">
         <ArriveContext.Provider value={{}}>
            <h1>HELLO</h1>
         </ArriveContext.Provider>

      </section>
   )
}

