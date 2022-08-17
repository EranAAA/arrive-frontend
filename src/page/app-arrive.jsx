import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { utilService } from '../services/util.service'
import { loadArrives, setFilter, loadResults } from '../store/arrive/arrive.action'

import { ArriveFilter } from '../cmps/arrive-filter'
import { StopTimeList } from '../cmps/stop-time-list'

export const ArriveContext = createContext()

export const AppArrive = () => {

   const dispatch = useDispatch()
   const { stops, routs, results } = useSelector(({ arriveModule }) => arriveModule)
   const [isSearching, setIsSearching] = useState(false)

   useEffect(() => {
      loadData()
   }, [])

   const loadData = async () => {
      await dispatch(loadArrives())
   }

   const getTripResult = async (trip) => {
      if (!trip.from) return

      dispatch(setFilter(trip))
      const results = await dispatch(loadResults(trip))
      console.log('results', results);
      // const result = stopsTime
      //    .sort((a, b) => utilService.getTimeInMs(a.arrival_time) - utilService.getTimeInMs(b.arrival_time))
      //    .filter(stops =>
      //       stops.stop_name === trip.from &&
      //       stops.arrival_time.substring(0, 2) >= trip.time.substring(0, 2))
      
      setIsSearching(true)
      // setResult(result)
   }

   if (!stops) return

   return (
      <section className="app-arrive">
         <ArriveContext.Provider value={{}}>
            <h1>כאן תדעו אם הרכבת מגיעה בזמן</h1>
            <ArriveFilter stopsList={stops} timeList={utilService.getTimeList()} getTripResult={getTripResult} />
            {isSearching && <StopTimeList results={results} />}
         </ArriveContext.Provider>

      </section>
   )
}

