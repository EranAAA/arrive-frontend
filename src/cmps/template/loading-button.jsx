import React, { useState } from 'react';

import { BiLoaderCircle } from 'react-icons/bi'

export const LoadingButton = () => {

   const [clicked, setClicked] = useState(false)

   const toggleBtnHandler = () => {
      setClicked(!clicked)
   }

   const styles = ['button'];
   let text = 'חפש';

   if (clicked) {
      styles.push('clicked');
   }

   return (
      <div className='loading-button'>
         <button className={styles.join(' ')} onClick={toggleBtnHandler}>{text}</button>
      </div>
   )
}


