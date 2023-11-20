import { AppStateProvider } from "./context/AppStateContext";
import { GameStateProvider } from "./context/GameDataContext";

import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <GameStateProvider>
          <Router />
        </GameStateProvider>
      </AppStateProvider>
    </BrowserRouter>
  );
}

export default App;
