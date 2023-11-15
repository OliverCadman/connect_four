import { Route, Routes } from "react-router-dom";
import { RouterType } from "./router.types";
import pageData from "../pages/page.data";

const Router = () => {
  const pageRoutes = pageData.map((page: RouterType, index) => {
    return <Route path={page.path} key={index} element={page.element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
