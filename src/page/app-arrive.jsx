import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { utilService } from '../services/util.service'
import { RouteList } from '../cmps/route-list'
import { loadSavedRoutes } from '../store/arrive/arrive.action'
import { Dropdown } from '../cmps/template/dropdown'

export const AppArrive = () => {

   const dispatch = useDispatch()
   const { routes } = useSelector(({ arriveModule }) => arriveModule)

   const [status, setStatus] = useState('בדרך')
   const [filterRoutes, setFilterRoutes] = useState('')

   useEffect(() => {
      // debugger
      if (!routes.length) loadData()
   }, [])

   useEffect(() => {
      if (status === 'בדרך') {
         const routesFilterd = routes.filter(route => utilService.getTimeRemainingToArrive(route))
         setFilterRoutes(routesFilterd)
         console.log('filter', routesFilterd);
      } else {
         setFilterRoutes(routes)
         console.log('filter', routes);
      }

   }, [status, routes])

   const loadData = async () => {
      await dispatch(loadSavedRoutes())
   }

   const getDataList = () => {
      return [{ id: 0, label: 'כל הרכבות' }, { id: 1, label: 'בדרך' }]
   }

   return (
      <section className="app-arrive">
         <h3>מעקב בזמן אמת</h3>
         <div className="dropdown-container">
            <Dropdown data={getDataList()} title='סטטוס' width={180} value={setStatus} filter={status} />
         </div>
         <RouteList routes={filterRoutes || routes} />
      </section>
   )
}

