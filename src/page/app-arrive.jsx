import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RouteList } from '../cmps/route-list'


export const AppArrive = () => {

   const { routes } = useSelector(({ arriveModule }) => arriveModule)

   return (
      <section className="app-arrive">
         <RouteList routes={routes} />
      </section>
   )
}

