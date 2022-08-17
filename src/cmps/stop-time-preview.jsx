import React, { useState, useEffect } from 'react'

export const StopTimePreview = ({ stop }) => {

   const getLongNameDevided = () => {
      return stop.route_long_name.split('<->')
   }
   
   return (
      <div className="stop-time-preview">

      <div className="arrive-time">{stop.arrival_time}</div>
      <div className="stop-name">{stop.stop_name}</div>

      <div className="destination-time">{stop.arrival_time_a}</div>
      <div className="stop-name">{stop.stop_name_a}</div>

      {/* <div className="destination-name">{getLongNameDevided()[0]}</div> */}

      {/* <div className="stop-name">{stop.trip_id}</div> */}

      </div>
   )
}

