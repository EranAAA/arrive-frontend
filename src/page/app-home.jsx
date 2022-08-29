import React, { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { utilService } from '../services/util.service'
import { ArriveFilter } from '../cmps/arrive-filter'

import { setFilter, loadResults, loadSiri } from '../store/arrive/arrive.action'

export const ArriveContext = createContext()

export const AppHome = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate();

   const { stops, siriLastCall } = useSelector(({ arriveModule }) => arriveModule)

   const getTripResult = async (trip) => {
      if (!trip.from) return
      dispatch(setFilter(trip))

      const now = Date.now()
      if ((now - siriLastCall) >= 180000) await dispatch(loadSiri())
      const results = await dispatch(loadResults(trip))
      console.log('results', results)
      navigate('/search', /*{state: Your data}*/)
   }

   if (!stops) return

   return (
      <section className="app-home">
         <div className="title">
            <h1>פלטפורמה למעקב אחרי זמני הרכבת בזמן אמת</h1>
            <p>הגעתם פעם לרכבת בשניה האחרונה וגיליתם שהיא מתעכבת בחמש דקות?</p>
         </div>

         <ArriveFilter stopsList={stops} timeList={utilService.getTimeList()} getTripResult={getTripResult} />
      </section>
   )
}

