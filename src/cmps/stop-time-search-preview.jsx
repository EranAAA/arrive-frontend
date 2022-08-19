import React, { useState, useEffect, useRef } from 'react'

import { BsCircleFill } from 'react-icons/bs'
import { CgArrowLongLeftR } from 'react-icons/cg'
import { AiOutlinePlusSquare } from 'react-icons/ai'

import { utilService } from '../services/util.service'

export const StopTimeSearchPreview = ({ stop }) => {

   const [timeRemaining, setTimeRemaining] = useState('')
   const intervalIdTime = useRef()

   useEffect(() => {
      startIntervral()

      return () => {
         clearInterval(intervalIdTime.current)
      }
   }, [])

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
      const start = utilService.getTimeInMs(stop.first_train)
      const stopTime = utilService.getTimeInMs(stop.arrival_time)

      if (now >= start && now <= stopTime) {
         setTimeRemaining(`${(stopTime - now) / 1000} דקות`)
      }
      else {
         setTimeRemaining('')
         clearInterval(intervalIdTime.current)
      }
   }

   const getdays = (day) => {
      const daysLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש',]
      if (stop.days.charAt(day) === '1') return <span className="in-schedule">{daysLetters[day]}</span>
      else if (stop.days.charAt(day) === '0') return <span className="off-schedule">{daysLetters[day]}</span>
   }

   const OnSubmit = () => {
      console.log('Clicked onSubmit');
      // updateRoute(stop)
   }

   return (
      <div className="route-preview">

         <div className="route-container">
            <div className="schedule-container">
               <div className="stop-name"><span> </span>{stop.stop_name},</div>
               <div className="arrive-time"><span> </span> {stop.arrival_time.substring(0, 5)}</div>
            </div>
            <CgArrowLongLeftR />
            <div className="schedule-container">
               <div className="stop-name"><span> </span>{stop.stop_name_a}</div>
               <div className="destination-time"><span> </span>{stop.arrival_time_a.substring(0, 5)}</div>
            </div>
         </div>

         <div className="days">
            <div className="sunday">{getdays(0)}</div>
            <div className="monday">{getdays(1)}</div>
            <div className="tuesday">{getdays(2)}</div>
            <div className="wednesday">{getdays(3)}</div>
            <div className="thursday">{getdays(4)}</div>
            <div className="friday">{getdays(5)}</div>
            <div className="saturday">{getdays(6)}</div>
         </div>

         <div className="real-time-container">
            {!timeRemaining && <div className="no-time-reamain"><span>שעת יציאה </span>{stop.first_train.substring(0, 5)}</div>}
            {timeRemaining && <div className="time-reamain"><div className="blink_me"><BsCircleFill /></div>{timeRemaining}</div>}
         </div>

         <div className="btn-submit" onClick={OnSubmit}><AiOutlinePlusSquare /></div>
      </div>
   )
}