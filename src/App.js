import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mapa from "./components/map/Map";
import PublicLayout from "./layout/publicLayout";
import routesjs from "./routes";


function App() {
  return (
  <>
    <Router>
      <Routes>
        <Route path='/' element={<PublicLayout routes={routesjs} />}/>
      </Routes>
    </Router>
  </>
  );
}

export default App;
