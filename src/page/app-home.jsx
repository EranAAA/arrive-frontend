import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { utilService } from '../services/util.service'
import { ArriveFilter } from '../cmps/arrive-filter'

import { loadArrives, setFilter, loadResults, loadSavedRoutes } from '../store/arrive/arrive.action'

export const ArriveContext = createContext()

export const AppHome = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate();

   const { stops } = useSelector(({ arriveModule }) => arriveModule)

   useEffect(() => {
      loadData()
   }, [])

   const loadData = async () => {
      await dispatch(loadArrives())
      await dispatch(loadSavedRoutes())
   }

   const getTripResult = async (trip) => {
      if (!trip.from) return
      dispatch(setFilter(trip))
      const results = await dispatch(loadResults(trip))
      console.log('results', results)
      navigate('/search', /*{state: Your data}*/)
   }

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

