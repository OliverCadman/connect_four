import React from "react";
import { useState, useContext, createContext } from "react";

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

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () =>
  useContext(AppStateContext) as AppStateContextType;
