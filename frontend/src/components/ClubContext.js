import React, { createContext, useContext } from 'react';

const ClubContext = createContext();

export const useClubContext = () => useContext(ClubContext);

export const ClubProvider = ({ children, handleSave }) => {
  return (
    <ClubContext.Provider value={{ handleSave }}>
      {children}
    </ClubContext.Provider>
  );
};