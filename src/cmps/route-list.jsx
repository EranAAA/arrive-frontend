import React, { useState, useEffect } from 'react'

import { utilService } from '../services/util.service'
import { RoutePreview } from './route-preview'
import { Dropdown } from './template/dropdown'

export const RouteList = ({ routes }) => {

   const [status, setStatus] = useState('')
   
   const getDataList = () => {
      return [{ id: 0, label: 'כל הרכבות' }, { id: 1, label: 'בדרך' }]
   }
   
   if (!routes) return

   return (
      <div className="route-list">
         <h3>רשימת הרכבות</h3>
         <div className="dropdown-inlist">
            <Dropdown data={getDataList()} title='סטטוס' width={180} value={setStatus} />
         </div>
         <div className="gird-conatiner">
            {routes
               .sort((a, b) => utilService.getTimeInMs(a.arrival_time) - utilService.getTimeInMs(b.arrival_time))
               .map((route, idx) => <RoutePreview route={route} key={idx} />)}
         </div>
      </div>
   )
}

