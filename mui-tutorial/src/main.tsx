import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./components/pages/Authentication";
import Database from "./components/pages/Database";
import Functions from "./components/pages/Functions";
import Hosting from "./components/pages/Hosting";
import MachineLearning from "./components/pages/MachineLearning";
import Storage from "./components/pages/Storage";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./components/dashboardTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="authentication" element={<Authentication />} />
            <Route path="source" element={<Database />} />
            <Route path="storage" element={<Storage />} />
            <Route path="functions" element={<Functions />} />
            <Route path="hosting" element={<Hosting />} />
            <Route path="machine-learning" element={<MachineLearning />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
