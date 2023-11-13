import GameArena from "./pages/GameArena";
import { AppStateProvider } from "./context/AppStateContext";
import { GameStateProvider } from "./context/GameDataContext";

function App() {
  return (
    <div className="main-bg">
      <AppStateProvider>
        <GameStateProvider>
          <GameArena />
        </GameStateProvider>
      </AppStateProvider>
    </div>
  );
}

export default App;
