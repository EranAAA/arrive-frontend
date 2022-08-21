import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { BsCircleFill } from 'react-icons/bs'
import { CgArrowLongLeft } from 'react-icons/cg'
import { MdOutlineHorizontalRule } from 'react-icons/md'
import { AiOutlinePlusSquare } from 'react-icons/ai'

import { utilService } from '../services/util.service'
import { siriService } from '../services/siri.service'

import { saveRoute } from '../store/arrive/arrive.action'

export const RoutePreview = ({ route, isInSearchList = false }) => {

   const dispatch = useDispatch()

   const [siri, setSiri] = useState('')
   const [timeRemaining, setTimeRemaining] = useState('')

   const intervalIdTime = useRef()

   useEffect(() => {
      setSiri('')
      loadSiri()
      startIntervral()

      return () => {
         setSiri('')
         clearInterval(intervalIdTime.current)
      }
   }, [route])

   const loadSiri = async () => {
      setSiri('')
      const data = await siriService.query({ stop: route.stop_code, train_no: route.train_no, route_id: route.route_id, direction: route.direction_id })
      setSiri(data[0])
      console.log('Called siri');
   }

   const startIntervral = () => {
      setTimeDiff()

      intervalIdTime.current = setInterval(() => {
         setTimeDiff()
      }, 60000);
   }

   const setTimeDiff = () => {
      const arrive = utilService.getTimeRemainingToArrive(route, siri)
      setTimeRemaining(arrive)
   }

   const OnSubmit = () => {
      updateRoute(route)
   }

   const updateRoute = async (route) => {
      console.log('updateRoute', route);
      await dispatch(saveRoute(route))
   }


   return (
      <div className="route-preview">
         <div className="route-container">
            <div className="schedule-container">
               <div className="stop-name"><span> </span>{route.stop_name}</div>
               <div className="arrive-time"><span> </span> {route.arrival_time.substring(0, 5)}</div>
            </div>
            <MdOutlineHorizontalRule />
            {`(${utilService.getTripLong(route)} דקות)`}
            <CgArrowLongLeft />
            <div className="schedule-container">
               <div className="stop-name"><span> </span>{route.stop_name_a}</div>
               <div className="destination-time"><span> </span>{route.arrival_time_a.substring(0, 5)}</div>
            </div>
         </div>

         <div className="days">
            <div className="sunday">{utilService.getdays(route.days, 0)}</div>
            <div className="monday">{utilService.getdays(route.days, 1)}</div>
            <div className="tuesday">{utilService.getdays(route.days, 2)}</div>
            <div className="wednesday">{utilService.getdays(route.days, 3)}</div>
            <div className="thursday">{utilService.getdays(route.days, 4)}</div>
            <div className="friday">{utilService.getdays(route.days, 5)}</div>
            <div className="saturday">{utilService.getdays(route.days, 6)}</div>
         </div>

         <div className="train_no">
            <div className="number">{`רכבת ${route.train_no}`}</div>
         </div>

         <div className="real-time-container">
            {!timeRemaining && <div className="no-time-reamain"><span>שעת יציאה </span>{route.first_train.substring(0, 5)}</div>}
            {timeRemaining && <div className="time-reamain"><div className="blink_me"><BsCircleFill /></div>{timeRemaining}</div>}
            {siri && /*!!utilService.getTimeDiff(route, siri) &&*/ <div className="siri">{`(${utilService.getTimeDiff(route, siri)}+)`}</div>}
         </div>

         { isInSearchList && <div className="btn-submit" onClick={OnSubmit}><AiOutlinePlusSquare /></div>}

      </div>
   )
}

