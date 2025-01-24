"use client";

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

import { ReactNode } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

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
