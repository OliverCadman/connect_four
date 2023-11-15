import { RouterType } from "../router/router.types";
import GameArena from "./GameArena";
import Home from "./Home";

const pageData: RouterType[] = [
  {
    path: "/",
    title: "Home",
    element: <Home />,
  },
  {
    path: "/game_arena",
    title: "Game Arena",
    element: <GameArena />,
  },
];

export default pageData;
