import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";

import { utilService } from '../services/util.service'
import { RoutePreview } from './route-preview'

export const StopTimeSearchList = ({ results }) => {

   console.log('results', results);
   
   if (!results) return <BounceLoader cssOverride={{ margin: "100px auto" }} color={'#ffffff'} />

   return (
      <div className="stop-time-list">
         <h3>תוצאות החיפוש</h3>
         <div className="gird-conatiner">
            {results
               .sort((a, b) => utilService.getTimeInMs(a.arrival_time) - utilService.getTimeInMs(b.arrival_time))
               .map((route, idx) => <RoutePreview route={route} key={idx} isInSearchList={true}/>)}
         </div>
      </div>
   )
}

