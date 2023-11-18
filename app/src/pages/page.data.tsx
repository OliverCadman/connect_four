import { RouterType } from "../router/router.types";
import GameArena from "./GameArena";
import GameRules from "./GameRules";
import Home from "./Home";

const pageData: RouterType[] = [
  {
    path: "/connect_four",
    title: "Home",
    element: <Home />,
  },
  {
    path: "/connect_four/game_arena",
    title: "Game Arena",
    element: <GameArena />,
  },
  {
    path: "/connect_four/game_rules",
    title: "Game Rules",
    element: <GameRules />,
  },
];

export default pageData;
