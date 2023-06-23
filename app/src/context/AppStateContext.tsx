import React from "react";
import { useState, useContext, createContext, useMemo } from "react";

interface IAppState {
  isMobileDevice: boolean;
}

type AppStateContextType = {
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
};

interface Props {
  children: React.ReactNode;
}

const AppStateContext = createContext<AppStateContextType | null>(null);

export const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [appState, setAppState] = useState<IAppState>({
    isMobileDevice: false,
  });

  const memoizedAppState = useMemo(
    () => ({
      appState,
      setAppState,
    }),
    [appState]
  );

  return (
    <AppStateContext.Provider value={memoizedAppState}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () =>
  useContext(AppStateContext) as AppStateContextType;
