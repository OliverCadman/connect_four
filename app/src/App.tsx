import GameArena from "./pages/GameArena";
import { AppStateProvider } from "./context/AppStateContext";
import { GameStateProvider } from "./context/GameDataContext";

function App() {
  return (
    <>
      <AppStateProvider>
        <GameStateProvider>
          <GameArena />
        </GameStateProvider>
      </AppStateProvider>
    </>
  );
}

export default App;
