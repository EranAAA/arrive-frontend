import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RouteList } from '../cmps/route-list'
import { loadSavedRoutes } from '../store/arrive/arrive.action'

export const AppArrive = () => {

   const dispatch = useDispatch()
   const { routes } = useSelector(({ arriveModule }) => arriveModule)

   useEffect(() => {
      if (!routes.length) loadData()
   }, [])

   const loadData = async () => {
      await dispatch(loadSavedRoutes())
   }

   return (
      <section className="app-arrive">
         <RouteList routes={routes} />
      </section>
   )
}

