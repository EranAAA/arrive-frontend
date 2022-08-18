import React, { useContext } from 'react'

import { LoadingButton } from './template/loading-button'

import { ArriveContext } from '../page/app-arrive'

export const StopTimeSearchPreview = ({ stop }) => {

   const { updateRoute } = useContext(ArriveContext);

   const getLongNameDevided = () => {
      return stop.route_long_name.split('<->')
   }

   const OnSubmit = () => {
      console.log('Clicked onSubmit');
      updateRoute(stop)
   }

   return (
      <div className="stop-time-preview">

         <div className="arrive-time">{stop.arrival_time}</div>
         <div className="stop-name">{stop.stop_name}</div>

         <div className="destination-time">{stop.arrival_time_a}</div>
         <div className="stop-name">{stop.stop_name_a}</div>

         {/* <div className="destination-name">{getLongNameDevided()[0]}</div> */}

         {/* <div className="stop-name">{stop.trip_id}</div> */}

         <div className="btn" onClick={OnSubmit}><LoadingButton title={'+'} width={60} /></div>

      </div>
   )
}