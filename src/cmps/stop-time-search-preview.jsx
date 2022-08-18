import React, { useContext } from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { AiOutlinePlusSquare } from 'react-icons/ai'

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
         <div className="stop-container">
            <div className="stop-name"><span>מתחנה: </span>{stop.stop_name},</div>
            <div className="arrive-time"><span>בשעה: </span> {stop.arrival_time.substring(0, 5)}</div>
            <FaLongArrowAltLeft />
            <div className="stop-name"><span>לתחנה: </span>{stop.stop_name_a}</div>
            <div className="destination-time"><span>בשעה: </span>{stop.arrival_time_a.substring(0, 5)}</div>
         </div>
         <div className="btn" onClick={OnSubmit}><AiOutlinePlusSquare/></div>
      </div>
   )
}