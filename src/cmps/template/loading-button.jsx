import React, { useState } from 'react';

import { BiLoaderCircle } from 'react-icons/bi'

export const LoadingButton = ({ title, width }) => {

   const [clicked, setClicked] = useState(false)

   const toggleBtnHandler = () => {
      setClicked(!clicked)
   }

   const styles = ['button'];
   let text = title;

   if (clicked) {
      styles.push('clicked');
   }

   return (
      <div className='loading-button'>
         <button className={styles.join(' ')} style={{ width: `${width}px` }} onClick={toggleBtnHandler}>{text}</button>
      </div>
   )
}


