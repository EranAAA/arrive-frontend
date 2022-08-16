import React, { useState, useEffect } from 'react'

import { Dropdown } from './template/dropdown'
import { LoadingButton } from './template/loading-button'

export const ArriveFilter = ({ stopsList, timeList, getTripResult }) => {

   const [from, setFrom] = useState('')
   const [to, setTo] = useState('')
   const [time, setTime] = useState('')

   const OnSubmit = () => {
      getTripResult({ from, to, time })
   }

   const getDataList = () => {
      return stopsList.map((stations, idx) => (
         { id: idx, label: stations.stop_name }
      ))
   }
   
   return (
      <div className="arrive-filter">
         <Dropdown data={getDataList()} title='תחנת עלייה' width={300} value={setFrom} />
         <Dropdown data={getDataList()} title='תחנת ירידה' width={300} value={setTo} />
         <Dropdown data={timeList} title='זמן' width={100} value={setTime} />
         <div onClick={OnSubmit}><LoadingButton /></div>
      </div>
   )
}

