import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { utilService } from '../services/util.service'
import { Dropdown } from './template/dropdown'
import { LoadingButton } from './template/loading-button'

export const ArriveFilter = ({ stopsList, timeList, getTripResult }) => {

   const { filter } = useSelector(({ arriveModule }) => arriveModule)

   const [dataList, setDataList] = useState('')
   const [from, setFrom] = useState(filter.from)
   const [to, setTo] = useState(filter.to)
   const [time, setTime] = useState(filter.time || utilService.getCurrentTimeFormat())
   const [msg, setMsg] = useState('')

   useEffect(() => {
      getDataList(stopsList)
   }, [stopsList])

   const OnSubmit = () => {
      if (!from || from === 'תחנת עלייה') return setMsg('חסר תחנת עלייה')
      if (!to || to === 'תחנת ירידה') return setMsg('חסר תחנת ירידה')
      if (!time || to === 'זמן') return setMsg('חסר שעת יציאה')
      if (from && to && time) {
         setMsg('')
         return getTripResult({ from, to, time })
      }
   }

   const getDataList = (list) => {
      const dropList = list.map((stations, idx) => (
         { id: idx, label: stations.stop_name }
      ))
      setDataList(dropList)
   }

   return (
      <div className="arrive-filter">
         <Dropdown data={dataList} title='תחנת עלייה' width={180} value={setFrom} filter={filter.from} />
         <Dropdown data={dataList} title='תחנת ירידה' width={180} value={setTo} filter={filter.to} />
         <Dropdown data={timeList} title='זמן' width={100} value={setTime} filter={filter.time || utilService.getCurrentTimeFormat()} />
         <div onClick={OnSubmit}><LoadingButton title={'חפש'} width={100} /></div>
         {msg && <div className="msg">{msg}</div>}
      </div>
   )
}

