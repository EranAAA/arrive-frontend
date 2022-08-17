import React, { useState, useEffect, useRef } from 'react'

import { debounce } from 'lodash'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from 'react-icons/io'
import { BsDot } from 'react-icons/bs'

export const Dropdown = ({ data, title, width, value, filter }) => {

   const [isOpen, setOpen] = useState(false);
   const [items, setItem] = useState('');
   const [selectedItem, setSelectedItem] = useState(filter);

   useEffect(() => {
      setItem(data)
   }, [data])

   const toggleDropdown = () => setOpen(!isOpen);

   const handleChange = (id, { label }) => {
      selectedItem === label ? setSelectedItem(null) : setSelectedItem(label);
      setOpen(false)
      value(label)
   };

   const debouncedOnChange = debounce(handleChange, 0)

   if (!items) return

   return (
      <div className="dropdown" style={{ width: `${width}px` }}>

         <div className="dropdown-header" onClick={toggleDropdown}>
            {selectedItem
               ? items.find((item) => item.label == selectedItem).label
               : title}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}>
               <IoIosArrowForward />
            </i>
         </div>

         <div className={`dropdown-body ${isOpen && "open"}`} style={{ width: `${width}px` }}>
            {items.map((item, idx) => (
               <div className="dropdown-item" key={idx} onClick={(e) => debouncedOnChange(e.target.id, item)} id={item.id} >
                  <span className={`dropdown-item-dot ${item.label == selectedItem && "selected"}`} >•{" "}</span>
                  {item.label}
               </div>
            ))}
         </div>
      </div>
   )
}

