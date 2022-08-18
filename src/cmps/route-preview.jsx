import React, { useState, useEffect, useRef } from 'react'

import { BsCircleFill } from 'react-icons/bs'
import { CgArrowLongLeftR } from 'react-icons/cg'

import { utilService } from '../services/util.service'
import { siriService } from '../services/siri.service'

export const RoutePreview = ({ route }) => {

   const [siri, setSiri] = useState('')
   const [timeRemaining, setTimeRemaining] = useState('')
   const intervalId = useRef()
   useEffect(() => {
      loadSiri()
      startIntervral()

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
      // console.log('now', now);
      // console.log('time', time);

      return time.toLocaleTimeString('HE-il', { hour: 'numeric', minute: 'numeric' })
   }

   const getTimeDiff = () => {
      let time = new Date(siri.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)
      time = time.toLocaleTimeString('HE-il', { hour: 'numeric', minute: 'numeric' })
      time = utilService.getTimeInMs(time)
      let arrival_time = utilService.getTimeInMs(route.arrival_time)
      return arrival_time - time
   }

   const startIntervral = () => {
      getTimeRemainingToArrive()
      intervalId.current = setInterval(() => {
         getTimeRemainingToArrive()
      }, 60000);
   }

   const getTimeRemainingToArrive = () => {
      const time = new Date();
      const current = time.getHours() + ':' + time.getMinutes();

      const now = utilService.getTimeInMs(current)
      const start = utilService.getTimeInMs(route.first_train)
      const stop = utilService.getTimeInMs(route.arrival_time)

      if (now >= start && now <= stop) {
         setTimeRemaining(`${(stop - now) / 1000} דקות`)
      }
      else {
         setTimeRemaining('')
         clearInterval(intervalId.current)
      }
   }

   console.log('timeRemaining', timeRemaining);

   return (
      <div className="route-preview">
         <div className="route-container">
            <div className="stop-name"><span>מתחנה: </span>{route.stop_name},</div>
            <div className="arrive-time"><span>בשעה: </span> {route.arrival_time.substring(0, 5)}</div>
            <CgArrowLongLeftR />
            <div className="stop-name"><span>לתחנה: </span>{route.stop_name_a}</div>
            <div className="destination-time"><span>בשעה: </span>{route.arrival_time_a.substring(0, 5)}</div>
         </div>

         <div className="real-time-container">
            {!timeRemaining && <div className="no-time-reamain"><span>שעת יציאה </span>{route.first_train.substring(0, 5)}</div>}
            {timeRemaining && <div className="time-reamain"><div className="blink_me"><BsCircleFill/></div>{timeRemaining}</div>}
            {siri && <div className="siri">איחור {getTimeDiff()}</div>}
         </div>

      </div>
   )
}

