import React, { useState, useEffect } from 'react'
import BounceLoader from "react-spinners/BounceLoader";

import { StopTimeSearchPreview } from './stop-time-search-preview'

export const StopTimeSearchList = ({ results }) => {
console.log(results);
   if (!results) return <BounceLoader cssOverride={{ margin: "100px auto" }} color={'#ffffff'} />

   console.log(results[0]);

   return (
      <div className="stop-time-list">
         <h3>תוצאות החיפוש</h3>
         <div className="gird-conatiner">
            {results.map((stop, idx) => <StopTimeSearchPreview stop={stop} key={idx} />)}
         </div>
      </div>
   )
}

