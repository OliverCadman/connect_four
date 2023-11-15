import { Route, Routes } from "react-router-dom";
import { RouterType } from "./router.types";
import Home from "../pages/Home";
import pageData from "../pages/page.data";

const Router = () => {
  const pageRoutes = pageData.map((page: RouterType, index) => {
    if (page.title === "Home") {
      return (
        <Route path={page.path} key={index} element={page.element} index />
      );
    } else return <Route path={page.path} key={index} element={page.element} />;
  });

  return (
    <Routes>
      {pageRoutes}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default Router;
