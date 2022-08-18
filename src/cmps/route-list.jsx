import React, { useState, useEffect } from 'react'

import { utilService } from '../services/util.service'
import { RoutePreview } from './route-preview'

export const RouteList = ({ routes }) => {

   if (!routes) return

   console.log(routes);

   return (
      <div className="route-list">
         <div className="gird-conatiner">
            {routes
               .sort((a, b) => utilService.getTimeInMs(b.arrival_time) - utilService.getTimeInMs(a.arrival_time))
               .map((route, idx) => <RoutePreview route={route} key={idx} />)}
         </div>
      </div>
   )
}

