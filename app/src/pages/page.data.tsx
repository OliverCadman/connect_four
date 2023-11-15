import { RouterType } from "../router/router.types";
import GameArena from "./GameArena";
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
];

export default pageData;
