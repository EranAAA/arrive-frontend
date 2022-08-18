import React, { useState, useEffect } from 'react'

import { utilService } from '../services/util.service'
import { siriService } from '../services/siri.service'

export const RoutePreview = ({ route }) => {

   const [siri, setSiri] = useState('')

   useEffect(() => {
     loadSiri()
   }, [])
   
   const loadSiri = async () => {
      const data = await siriService.query({ stop: route.stop_code, train_no: route.train_no, route_id: route.route_id, direction: route.direction_id})
      setSiri(data[0])
   }

   const getLongNameDevided = () => {
      return route.route_long_name.split('<->')
   }

   const getTimeRemainingToArrive = () => {
      const time = new Date();
      const current = time.getHours() + ':' + time.getMinutes();

      const now = utilService.getTimeInMs(current)
      const start = utilService.getTimeInMs(route.first_train)
      const stop = utilService.getTimeInMs(route.arrival_time)

      if (now >= start && now <= stop) {
         // console.log('now', now);
         // console.log('start', start);
         // console.log('stop', stop);
         // console.log('diff', (stop - now)/1000);
         // console.log(true);
         return `arrive in ${(stop - now)/1000} min`
      }      
   }

   return (
      <div className="route-preview">
         <div className="arrive-time">{route.arrival_time}</div>
         <div className="stop-name">{route.stop_name}</div>

         <div className="destination-time">{route.arrival_time_a}</div>
         <div className="stop-name">{route.stop_name_a}</div>

         <div className="time-reamain">{route.first_train}</div>

         <div className="time-reamain">{getTimeRemainingToArrive()}</div>

         { siri && <div className="siri">{siri.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime}</div>}

         {/* <div className="destination-name">{getLongNameDevided()[0]}</div> */}

         {/* <div className="stop-name">{stop.trip_id}</div> */}

      </div>
   )
}

