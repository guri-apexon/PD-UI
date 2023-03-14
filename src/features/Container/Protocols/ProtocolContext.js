import { createContext, useContext } from 'react';

const ProtocolContext = createContext({
  digitizedContent: [],
  dispatchSectionEvent: () => {},
});
const useProtContext = () => {
  return useContext(ProtocolContext);
};
export { useProtContext, ProtocolContext };
