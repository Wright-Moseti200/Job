/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { createContext } from 'react'


export let Contextdata = createContext();

const ContextProvider = ({children}) => {
  return (
    <Contextdata.Provider>
        {children}
   </Contextdata.Provider>
  )
}

export default ContextProvider