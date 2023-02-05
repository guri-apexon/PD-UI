import { createContext, useContext } from 'react';

const ProtocolContext = createContext();
const useProtContext = () => {
  return useContext(ProtocolContext);
};
export { useProtContext, ProtocolContext };
