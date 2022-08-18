import React, { useState, useEffect, useRef } from 'react'

import { FaLongArrowAltLeft } from 'react-icons/fa'

import { utilService } from '../services/util.service'
import { siriService } from '../services/siri.service'

export const RoutePreview = ({ route }) => {

   const [siri, setSiri] = useState('')
   const [timeRemaining, setTimeRemaining] = useState('')
   const intervalId = useRef()
   useEffect(() => {
      loadSiri()
      getTimeRemainingToArrive()

      return () => {
         clearInterval(intervalId.current)
      }
   }, [])

   const loadSiri = async () => {
      const data = await siriService.query({ stop: route.stop_code, train_no: route.train_no, route_id: route.route_id, direction: route.direction_id })
      setSiri(data[0])
   }

   const getTime = (date) => {
      const time = new Date(date)
      const now = new Date();
      console.log('now', now);
      console.log('time', time);

      return time.toLocaleTimeString('HE-il', { hour: 'numeric', minute: 'numeric' })
   }

   const getTimeRemainingToArrive = () => {
      intervalId.current = setInterval(() => {
         const time = new Date();
         const current = time.getHours() + ':' + time.getMinutes();

         const now = utilService.getTimeInMs(current)
         const start = utilService.getTimeInMs(route.first_train)
         const stop = utilService.getTimeInMs(route.arrival_time)

         if (now >= start && now <= stop) setTimeRemaining(`${(stop - now) / 1000} דקות`)
         else clearInterval(intervalId.current)

      }, 60000);
   }

   return (
      <div className="route-preview">
         <div className="route-container">
            <div className="stop-name"><span>מתחנה: </span>{route.stop_name},</div>
            <div className="arrive-time"><span>בשעה: </span> {route.arrival_time.substring(0, 5)}</div>
            <FaLongArrowAltLeft />
            <div className="stop-name"><span>לתחנה: </span>{route.stop_name_a}</div>
            <div className="destination-time"><span>בשעה: </span>{route.arrival_time_a.substring(0, 5)}</div>
         </div>

         <div className="real-time-container">
            {!timeRemaining && <div className="time-reamain"><span>שעת יציאה </span>{route.first_train.substring(0, 5)}</div>}
            {timeRemaining && <div className="time-reamain">🟢<div className="blink_me"></div>{timeRemaining}</div>}
            {siri && <div className="siri"> {getTime(siri.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)}</div>}
         </div>

      </div>
   )
}

