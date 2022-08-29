import React, { useRef, useEffect } from "react";

export const OutsideAlert = ({ children }) => {
   const wrapperRef = useRef(null);

   useEffect(() => {

      function handleClickOutside(event) {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            console.log('OutsideAlert');
         }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         // Unbind the event listener on clean up
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [wrapperRef]);

   return <div ref={wrapperRef}>{children}</div>;
}