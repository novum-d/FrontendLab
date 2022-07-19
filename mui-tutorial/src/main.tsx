import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Authentication,
  Functions,
  Hosting,
  MachineLearning,
  Source,
  Storage,
} from "./components/navbar/Pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="authentication" element={<Authentication />} />
          <Route path="source" element={<Source />} />
          <Route path="storage" element={<Storage />} />
          <Route path="functions" element={<Functions />} />
          <Route path="hosting" element={<Hosting />} />
          <Route path="machine-learning" element={<MachineLearning />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
