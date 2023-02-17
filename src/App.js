import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Mapa from "./components/Map/Map";
import PublicLayout from "./layout/publicLayout";
import LoginDashboard from "./layout/loginDashboard";
import routesjs from "./routes";

const getRoutes = (routes, layout) => {
  return routes.map((route, index) => {
    if (route.collapse) {
      return (
        <Route path={route.path} key={index} element={<Outlet />}>
          {getRoutes(route.views, layout)}
        </Route>
      );
    } else {
      if (route.layout === layout) {
        return (
          <Route path={route.path} key={index} element={route.component} />
        );
      } else {
        return null;
      }
    }
  });
};


function App() {
  return (
  <>
    <Router>
      <Routes>
        <Route path='/' element={<PublicLayout routes={routesjs} />}>
          {getRoutes(routesjs, "dashboard")}
        </Route>
        <Route path='/' element={<LoginDashboard routes={routesjs} />}>
          {getRoutes(routesjs, "login")}
        </Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
