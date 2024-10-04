import { useState, useContext, createContext } from 'react';

const SelectedValueContext = createContext();

export const useSelectedValue = () => {
  return useContext(SelectedValueContext);
};

export const SelectedValueProvider = ({ children }) => {
  
  const [selectedValue, setSelectedValue] = useState('popular');
  const [tvValue, setTvValue] = useState('');

  return (
    <SelectedValueContext.Provider value={{ selectedValue, setSelectedValue}}>
      {children}
    </SelectedValueContext.Provider>
  );
};
