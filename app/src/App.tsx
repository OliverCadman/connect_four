import { AppStateProvider } from "./context/AppStateContext";
import { GameStateProvider } from "./context/GameDataContext";

import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";

function App() {
  return (
    <BrowserRouter>
      <div className="main-bg">
        <AppStateProvider>
          <GameStateProvider>
            <Router />
          </GameStateProvider>
        </AppStateProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
