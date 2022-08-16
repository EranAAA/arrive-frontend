import React, { useState, useEffect, useRef } from 'react'

import { debounce } from 'lodash'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from 'react-icons/io'

export const ArriveFilter = ({data}) => {

   // const data = [
   //    { id: 0, label: "Istanbul, TR (AHL)" },
   //    { id: 1, label: "Paris, FR (CDG)" }
   // ];

   const [isOpen, setOpen] = useState(false);
   const [items, setItem] = useState(data);
   const [selectedItem, setSelectedItem] = useState(null);

   const toggleDropdown = () => setOpen(!isOpen);

   const handleChange = (id) => {
      selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
   };

   const debouncedOnChange = debounce(handleChange, 0)

   return (
      <div className="arrive-filter">

         <div className="dropdown-header" onClick={toggleDropdown}>
            {selectedItem
               ? items.find((item) => item.id == selectedItem).label
               : "תחנת עלייה"}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}>
            <IoIosArrowForward/>
            </i>
         </div>

         <div className={`dropdown-body ${isOpen && "open"}`}>
            {items.map((item, idx) => (
               <div className="dropdown-item" key={idx} onClick={(e) => debouncedOnChange(e.target.id)} id={item.id} >
                  <span className={`dropdown-item-dot ${item.id == selectedItem && "selected"}`} >
                     •{" "}
                  </span> {item.label}
               </div>
            ))} 
         </div>
      </div>
   )
}

