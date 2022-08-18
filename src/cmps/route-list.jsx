import React, { useState, useEffect } from 'react'

import { RoutePreview } from './route-preview'

export const RouteList = ({ routes }) => {

   if (!routes) return 

   console.log(routes);

   return (
      <div className="route-list">
         <div className="gird-conatiner">
            {routes.map((route, idx) => <RoutePreview route={route} key={idx} />)}
         </div>
      </div>
   )
}

