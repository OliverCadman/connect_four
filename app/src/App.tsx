import { AppStateProvider } from "./context/AppStateContext";
import { GameStateProvider } from "./context/GameDataContext";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Router from "./router/router";
import Home from "./pages/Home";

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
