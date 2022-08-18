import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { utilService } from '../services/util.service'
import { loadArrives, setFilter, loadResults, loadSavedRoutes, saveRoute } from '../store/arrive/arrive.action'

import { ArriveFilter } from '../cmps/arrive-filter'
import { StopTimeSearchList } from '../cmps/stop-time-search-list'
import { RouteList } from '../cmps/route-list'


export const ArriveContext = createContext()

export const AppArrive = () => {

   const dispatch = useDispatch()
   const { stops, routes, results } = useSelector(({ arriveModule }) => arriveModule)
   const [isSearching, setIsSearching] = useState(false)

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
      setIsSearching(true)
      const results = await dispatch(loadResults(trip))
      console.log('results', results);
   }

   const updateRoute = async (route) => {
      console.log('updateRoute', route);
      await dispatch(saveRoute(route))
   }

   if (!stops) return

   return (
      <section className="app-arrive">
         <ArriveContext.Provider value={{ updateRoute }}>
            <h1>מערכת לזיהוי איחורי הרכבת</h1>

            {/* <Accordion >
               <Accordion.Item eventKey="1">
                  <Accordion.Header >חיפוש</Accordion.Header>
                  <Accordion.Body>
                     <ArriveFilter stopsList={stops} timeList={utilService.getTimeList()} getTripResult={getTripResult} />
                     {isSearching && <StopTimeSearchList results={results} />}
                  </Accordion.Body>
               </Accordion.Item>
            </Accordion> */}

            <Tabs
               defaultActiveKey="lines"
               id="justify-tab-example"
               className="mb-3"
               // justify
            >
               <Tab eventKey="lines" title="קווי רכבת">
                  <RouteList routes={routes} />
               </Tab>
               <Tab eventKey="search" title="חיפוש">
                  <ArriveFilter stopsList={stops} timeList={utilService.getTimeList()} getTripResult={getTripResult} />
                  {isSearching && <StopTimeSearchList results={results} />}
               </Tab>
            </Tabs>

         </ArriveContext.Provider>

      </section>
   )
}

