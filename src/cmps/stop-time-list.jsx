import React, { useState, useEffect } from 'react'

import { StopTimePreview } from '../cmps/stop-time-preview'

export const StopTimeList = ({ result }) => {

   if (!result) return <h1>טוען חיפוש...</h1>

   // console.log(result[0]);

   return (
      <div className="stop-time-list">
         <h3>תוצאות החיפוש</h3>
         <div className="gird-conatiner">
            {result.map((stop, idx) => <StopTimePreview stop={stop} key={idx} />)}
         </div>
      </div>
   )
}

