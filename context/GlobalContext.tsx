"use client";

import { createContext, useContext, useState } from "react";

import { ReactNode } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
