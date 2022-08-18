import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Dropdown } from './template/dropdown'
import { LoadingButton } from './template/loading-button'

export const ArriveFilter = ({ stopsList, timeList, getTripResult }) => {

   const { filter } = useSelector(({ arriveModule }) => arriveModule)

   const [dataList, setDataList] = useState('')
   const [from, setFrom] = useState(filter.from)
   const [to, setTo] = useState(filter.to)
   const [time, setTime] = useState(filter.time)

   useEffect(() => {
      getDataList(stopsList)
   }, [stopsList])
   
   const OnSubmit = () => {
      getTripResult({ from, to, time })
   }

   const getDataList = (list) => {
      const dropList = list.map((stations, idx) => (
         { id: idx, label: stations.stop_name }
      ))
      setDataList(dropList)
   }

   return (
      <div className="arrive-filter">
         <Dropdown data={dataList} title='תחנת עלייה' width={300} value={setFrom} filter={filter.from}/>
         <Dropdown data={dataList} title='תחנת ירידה' width={300} value={setTo} filter={filter.to}/>
         <Dropdown data={timeList} title='זמן' width={100} value={setTime} filter={filter.time}/>
         <div onClick={OnSubmit}><LoadingButton title={'חפש'} width={300}/></div>
      </div>
   )
}

