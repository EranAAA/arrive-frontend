import React, { useState, useEffect, useRef } from 'react'

import { BsCircleFill } from 'react-icons/bs'
import { CgArrowLongLeftR } from 'react-icons/cg'

import { utilService } from '../services/util.service'
import { siriService } from '../services/siri.service'

export const RoutePreview = ({ route }) => {

   const [siri, setSiri] = useState('')
   const [timeRemaining, setTimeRemaining] = useState('')

   const intervalIdTime = useRef()
   const intervalIdSiri = useRef()

   useEffect(() => {
      loadSiri()
      startIntervral()

      return () => {
         clearInterval(intervalIdTime.current)
         clearInterval(intervalIdSiri.current)
      }
   }, [])

   const loadSiri = async () => {
      const data = await siriService.query({ stop: route.stop_code, train_no: route.train_no, route_id: route.route_id, direction: route.direction_id })
      setSiri(data[0])

      // intervalIdTime.current = setInterval(() => {
      //    const data = await siriService.query({ stop: route.stop_code, train_no: route.train_no, route_id: route.route_id, direction: route.direction_id })
      //    setSiri(data[0])
      // }, 60000);
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
      intervalIdTime.current = setInterval(() => {
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
         clearInterval(intervalIdTime.current)
      }
   }

   const getdays = (day) => {
      const daysLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש',]
      const dayOfWeekDigit = new Date().getDay()

      // if (route.days.charAt(day) === '1' && dayOfWeekDigit === day) return <span className="in-schedule-today">{daysLetters[day]}</span>
      if (route.days.charAt(day) === '1') return <span className="in-schedule">{daysLetters[day]}</span>
      // else if (route.days.charAt(day) === '0' && dayOfWeekDigit === day) return <span className="off-schedule-today">{daysLetters[day]}</span>
      else if (route.days.charAt(day) === '0') return <span className="off-schedule">{daysLetters[day]}</span>
   }

   return (
      <div className="route-preview">
         <div className="route-container">
            <div className="stop-name"><span>מתחנה: </span>{route.stop_name},</div>
            <div className="arrive-time"><span>בשעה: </span> {route.arrival_time.substring(0, 5)}</div>
            <CgArrowLongLeftR />
            <div className="stop-name"><span>לתחנה: </span>{route.stop_name_a}</div>
            <div className="destination-time"><span>בשעה: </span>{route.arrival_time_a.substring(0, 5)}</div>

            <div className="days">
               <div className="sunday">{getdays(0)}</div>
               <div className="monday">{getdays(1)}</div>
               <div className="tuesday">{getdays(2)}</div>
               <div className="wednesday">{getdays(3)}</div>
               <div className="thursday">{getdays(4)}</div>
               <div className="friday">{getdays(5)}</div>
               <div className="saturday">{getdays(6)}</div>
            </div>
         </div>


         <div className="real-time-container">
            {!timeRemaining && <div className="no-time-reamain"><span>שעת יציאה </span>{route.first_train.substring(0, 5)}</div>}
            {timeRemaining && <div className="time-reamain"><div className="blink_me"><BsCircleFill /></div>{timeRemaining}</div>}
            {siri && <div className="siri">איחור {getTimeDiff()}</div>}
         </div>

      </div>
   )
}

