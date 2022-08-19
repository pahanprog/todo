import React, { createContext, useState } from "react";

export const AdaptiveContext = createContext({} as AdaptiveContextProps);

interface AdaptiveContextProps {
  sideBarOpen: boolean;
  toggleSideBarOpen: () => void;
}

interface Props {
  children?: React.ReactNode;
}

// Провайдер контеска для работы адаптивной левой панели
const AdaptiveProvider = ({ children }: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBarOpen = () => {
    setSideBarOpen((prevSideBarState) => !prevSideBarState);
  };

  return (
    <AdaptiveContext.Provider value={{ sideBarOpen, toggleSideBarOpen }}>
      {children}
    </AdaptiveContext.Provider>
  );
};

export default AdaptiveProvider;
