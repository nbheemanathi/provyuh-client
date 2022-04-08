import React from "react";
import { BrowserRouter } from "react-router-dom";
import SideMenu from "./partials/sideMenu/SideMenu";
import "./css/styles.scss";

import AppRouter from "./util/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
