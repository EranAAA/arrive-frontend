import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { utilService } from '../services/util.service'

import { arriveService } from '../services/arrive.service'
import { ArriveFilter } from '../cmps/arrive-filter'
import { loadArrives } from '../store/arrive/arrive.action'
import { stubString } from 'lodash'

export const ArriveContext = createContext()

export const AppArrive = () => {

   const dispatch = useDispatch()
   const { stops, routs, stopsTime } = useSelector(({ arriveModule }) => arriveModule)

   useEffect(() => {
      loadData()
   }, [])

   const loadData = async () => {
      await dispatch(loadArrives())
   }

   const getTripResult = (trip) => {
      console.log(trip.time.substring(0, 2));
      const result = stopsTime.filter(stops =>
         stops.stop_name === trip.from &&
         stops.arrival_time.substring(0, 2) >= trip.time.substring(0, 2))

      console.table(result);
   }

   if (!stops) return

   return (
      <section className="app-arrive">
         <ArriveContext.Provider value={{}}>
            <h1>כאן תדעו אם הרכבת מגיעה בזמן</h1>
            <ArriveFilter stopsList={stops} timeList={utilService.getTimeList()} getTripResult={getTripResult} />
            {/* <stopTimeList/> */}
         </ArriveContext.Provider>

      </section>
   )
}

