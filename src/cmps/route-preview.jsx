import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BsCircleFill } from 'react-icons/bs'
import { CgArrowLongLeft } from 'react-icons/cg'
import { MdOutlineHorizontalRule } from 'react-icons/md'
import { AiOutlinePlusSquare } from 'react-icons/ai'

import { saveRoute } from '../store/arrive/arrive.action'
import { utilService } from '../services/util.service'

export const RoutePreview = ({ route, isInSearchList = false }) => {

   const dispatch = useDispatch()
   const { siri } = useSelector(({ arriveModule }) => arriveModule)

   const [timeRemaining, setTimeRemaining] = useState('')
   const [isAddedToList, setIsAddedToList] = useState(false)

   const intervalIdTime = useRef()

   useEffect(() => {
      startIntervral()

      return () => {
         clearInterval(intervalIdTime.current)
      }
   }, [route])

   const startIntervral = () => {
      setTimeDiff()

      intervalIdTime.current = setInterval(async () => {
         setTimeDiff()
      }, 60000);
   }

   const setTimeDiff = () => {
      const arrive = utilService.getTimeRemainingToArrive(route, siri)
      setTimeRemaining(arrive)
   }

   const OnSubmit = () => {
      if (isInSearchList) updateRoute(route)
      setIsAddedToList(true)
   }

   const updateRoute = async (route) => {
      console.log('updateRoute', route);
      await dispatch(saveRoute(route))
   }

   return (
      <div className="route-preview add" onClick={OnSubmit}>
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
            {siri && utilService.getTimeDiff(route, siri) && <div className="siri">{`(${utilService.getTimeDiff(route, siri)?.totalDelay}+)`}</div>}
         </div>

         {isInSearchList && isAddedToList && <div className="added"></div>}

      </div>
   )
}

