import { RouterType } from "../router/router.types";
import GameArena from "./GameArena";
import Home from "./Home";

const pageData: RouterType[] = [
  {
    path: "/home",
    title: "Home",
    element: <Home />,
  },
  {
    path: "/game-arena",
    title: "Game Arena",
    element: <GameArena />,
  },
];

export default pageData;
